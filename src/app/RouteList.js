import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import DocumentTitle from "react-document-title";
import {findNodePaths, hierarchize} from "../lib/tree";
import identity from "../lib/identity";
import pathToRegexp from "path-to-regexp";
import {MasterLayout, PublicLayout} from "../layouts";
import Login from "../modules/auth/Login";
import NotFound from "./NotFound";
import routes from "./routes";
import Principal from "../components/Principal";
import NoAccess from "./NoAccess";

hierarchize(routes);
const APP_NAME = "深圳先达速运有限公司";

const getLayout = ({isPublic, layout}) => {
    if (layout) return layout;
    return isPublic ? PublicLayout : MasterLayout;
};

const LayoutRoute = params => {
    const {
        path,
        exact,
        component: Component,
        title,
        isPublic,
        // authorize,
        identity
    } = params;

    const Layout = getLayout(params);
    const docTitle = title ? `${APP_NAME} - ${title}` : APP_NAME;

    return (
        <Route
            path={path}
            exact={exact}
            render={props =>
                isPublic || identity.isAuthenticated ? (
                    <DocumentTitle title={docTitle}>
                        <Layout identity={identity} routeParams={params}>
                            <Component {...props} identity={identity} routeParams={params}/>
                        </Layout>
                    </DocumentTitle>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
};

//创建路由方法(递归)
const createRoutes = (items, otherProps) =>
    items.map((item, index) => {
        const key = `${item.path}__${index}`;
        if (item.children) {
            const [first] = item.children;
            return [
                <Redirect
                    key={key}
                    path={item.path}
                    exact={item.exact}
                    to={first.path}
                />,
                ...createRoutes(item.children, otherProps)
            ];
        } else {
            return <LayoutRoute {...item} {...otherProps} key={key}/>;
        }
    });

// 路由表组件
const RouterList = props => {
    const principal = new Principal(identity);
    const {location: {pathname}} = props;
    const selectedRoutes = findNodePaths(
        routes,
        item => item.path && pathToRegexp(item.path).exec(pathname)
    );
    if (principal && principal.isAuthenticated && selectedRoutes.length > 0) {
        let flag = principal.test(selectedRoutes[selectedRoutes.length - 1].authorize);
        if (!flag) {
            return (
                <LayoutRoute isPublic={true} component={NoAccess}/>
            )
        }
    }

    return (
        <Switch>
            <LayoutRoute path="/login" isPublic={true} component={Login}/>
            {createRoutes(routes, {selectedRoutes, identity})}
            <LayoutRoute isPublic={true} component={NotFound}/>
        </Switch>
    );
};

export default RouterList;
