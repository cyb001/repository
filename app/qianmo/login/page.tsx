import React from "react";
import LoginForm from './LoginForm'; // 假设 LoginForm 已转换为 React 组件
import styles from "./Login.module.scss"; // 对应的 CSS Modules 文件

const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.background}>
        <img
          src={"/images/bg/lf_icon1.png"}
          className={styles.backgroundImage}
          alt="background"
        />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.titleBox}>
          <span className={styles.titleLeft}>欢迎使用</span>
          <span className={styles.titleRight}>Qianmo AI</span>
        </div>
        <LoginForm />
      </div>
      <div className={styles.poweredBy}>Powered by Qianmo</div>
    </div>
  );
};

export default LoginPage;
