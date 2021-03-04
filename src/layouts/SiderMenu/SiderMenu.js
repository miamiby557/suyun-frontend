import React, { PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import routes from "../../app/routes";
import styles from "./index.module.less";

const { Sider } = Layout;

class SiderMenu extends PureComponent {
  getMenuItems = routes =>
    routes.map(
      route =>
        route.children && this.props.principal.test(route.authorize) ? (
          <Menu.SubMenu
            key={route.path}
            title={
              <span>
                <Icon type={route.icon} />
                <span>{route.title}</span>
              </span>
            }
          >
            {this.getMenuItems(route.children)}
          </Menu.SubMenu>
        ) : route.path && !route.hideOnMenu && this.props.principal.test(route.authorize) ? (
          <Menu.Item key={route.path}>
            <Link to={route.path}>
              {route.icon && <Icon type={route.icon} />}
              <span>{route.title}</span>
            </Link>
          </Menu.Item>
        ) : null
    );

  render() {
    const {
      collapsed,
      onCollapse,
      logo,
      routeParams: { selectedRoutes = [] }
    } = this.props;

    const selectedPaths = selectedRoutes.map(item => item.path);
    const selectedKeys = selectedPaths.slice(-1);
    const openedKeys = selectedPaths.slice(0, -1);

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>先达速运有限公司</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          defaultOpenKeys={openedKeys}
          style={{
            padding: "16px 0",
            width: "100%"
          }}
        >
          {this.getMenuItems(routes)}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SiderMenu);
