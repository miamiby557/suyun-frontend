import React, { PureComponent } from "react";
import { Menu, Icon, Spin, Dropdown, Avatar, Divider } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
import avatar from "../../assets/user_avatar.png";

export default class GlobalHeader extends PureComponent {
  toggle = () => {
    const { onCollapse } = this.props;
    onCollapse && onCollapse();
  };

  render() {
    const { identity, collapsed, isMobile, logo, onMenuClick } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item>
            <Link to="/profile">
                <Icon type="user"/>个人中心
            </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          {identity.account ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={avatar} />
                <span className={styles.name}>{identity.account}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin
              size="small"
              style={{
                marginLeft: 8
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
