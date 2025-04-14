"use client";

import React, { useState } from "react";
import {
  Button,
  Popover,
  Avatar,
  Row,
  Col,
  Typography,
  Divider,
  Modal,
  message
} from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import "./style.css";
const { Text } = Typography;
import { useRouter } from "next/navigation";
import setting from "@/app/qianmo/config/setting";
import { logout } from "@/service/common";

const userInfo = {
  name: "正式用户",
  gender: 1,
  email: "user@dify.com",
};

const App: React.FC = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openUserInfo = () => {};

  // 退出登录
  const handelLogout = () => {
    setIsModalOpen(true);
  };
  // 执行退出
  const doLogout = async () => {
    messageApi.open({
      type: 'loading',
      content: '正在退出',
      duration: 0,
    });
    setIsModalOpen(false);
    await logout({
      url: "/logout",
      params: {},
    });

    localStorage.removeItem("setup_status");
    localStorage.removeItem("console_token");
    localStorage.removeItem("refresh_token");

    router.push(setting.loginPage);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  const content = (
    <div style={{ width: "250px", padding: "10px" }}>
      <Avatar size={50} src={"/images/user.png"} style={{ marginBottom: 8, marginLeft: 10 }} />

      <div>
        <Row align="middle">
          <Col span={12}>
            <Text strong style={{ margin: "0 0 0 10px" }}>
              {userInfo.name}
              {userInfo.gender === 1 && (
                <ManOutlined
                  style={{ color: "#3C95F8", fontSize: 15, marginLeft: 4 }}
                />
              )}
              {userInfo.gender === 0 && (
                <WomanOutlined
                  style={{ color: "#EC407A", fontSize: 15, marginLeft: 4 }}
                />
              )}
            </Text>
          </Col>
        </Row>
        <Text
          type="secondary"
          style={{ margin: "0 0 0 10px", fontSize: 14, display: "block" }}
        >
          {userInfo.email}
        </Text>
      </div>

      <Divider style={{margin: "20px 0 15px 0"}} />

      <div
        className="info-list"
        onClick={openUserInfo}
        style={{ cursor: "pointer", marginBottom: 8 }}
      >
        ☀️ 个人中心
      </div>

      <div
        className="info-list"
        onClick={openUserInfo}
        style={{ cursor: "pointer", marginBottom: 8 }}
      >
        🔮 系统管理
      </div>

      <div
        className="info-list"
        style={{ cursor: "pointer", marginBottom: 8 }}
      >
        ⏳ 授权中心
      </div>

      <Button
        type="text"
        danger
        onClick={handelLogout}
        style={{
          width: "100%",
          textAlign: "left",
          padding: 0,
          backgroundColor: "#fff2f0",
        }}
      >
        退出登录
      </Button>
    </div>
  );

  return (
    <>
      {contextHolder}
      <Popover content={content} title="">
        <Avatar size={35} src={"/images/user.png"} shape={"circle"} style={{cursor: "pointer"}} />
      </Popover>
      <Modal
        title="登出提示"
        open={isModalOpen}
        onOk={doLogout}
        onCancel={cancelLogout}
        okText="确认"
        cancelText="取消"
      >
        确认退出平台？
      </Modal>
    </>
  );
};

export default App;
