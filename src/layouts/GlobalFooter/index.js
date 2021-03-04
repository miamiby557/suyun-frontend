import React from "react";
import { Icon } from "antd";
import styles from "./index.module.less";

const GlobalFooter = () => {
  return (
    <div className={styles.globalFooter}>
      <div className={styles.links}>
        <a
          href="http://www.yulanginfo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          先达数据信息技术
        </a>
      </div>
      <div className={styles.copyright}>
        Copyright 
        <Icon type="copyright" /> 
        2019 深圳先达数据信息技术有限公司
      </div>
    </div>
  );
};

export default GlobalFooter;
