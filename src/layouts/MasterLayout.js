import React, {PureComponent} from "react";
import {Layout} from "antd";
import SiderMenu from "./SiderMenu";
import logo from "../assets/logo.png";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
import PageHeader from "./PageHeader";
import {logout,identity} from "../lib/identity";
import Principal from '../components/Principal';

const {Content, Header, Footer} = Layout;

class MasterLayout extends PureComponent {
    state = {
        collapsed: false,
        isMobile: false
    };

    toogleCollapse = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    };

    onMenuClick = (e) => {
        if (e.key && e.key === "logout") {
            logout();
            window.location.reload();
        }
    };

    render() {
        const {children, ...rest} = this.props;
        this.principal = new Principal(identity);
        return (
            <Layout>
                <SiderMenu
                    logo={logo}
                    collapsed={this.state.collapsed}
                    isMobile={this.state.isMobile}
                    onCollapse={this.toogleCollapse}
                    principal={this.principal}
                    {...rest}
                />
                <Layout>
                    <Header
                        style={{
                            padding: 0
                        }}
                    >
                        <GlobalHeader
                            logo={logo}
                            collapsed={this.state.collapsed}
                            isMobile={this.state.isMobile}
                            onCollapse={this.toogleCollapse}
                            onMenuClick={this.onMenuClick}
                            {...rest}
                        />
                    </Header>
                    <PageHeader {...rest} />
                    <Content
                        style={{
                            margin: "24px 24px 0",
                            height: "1px"
                        }}
                    >
                        {children}
                    </Content>

                    <Footer
                        style={{
                            padding: 0
                        }}
                    >
                        <GlobalFooter/>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MasterLayout;
