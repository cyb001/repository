"use client";

import React, { useState } from "react";
import { Form, Input, Button, message  } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.scss";
import { useRouter } from "next/navigation";
import setting from "@/app/qianmo/config/setting";
import { login } from '@/service/common'

interface FormValues {
  account: string;
  password: string;
}

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
const emailRegex = /^[\w.!#$%&'*+\-/=?^{|}~]+@([\w-]+\.)+[\w-]{2,}$/m

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    if (!values.account) {
      messageApi.open({
        type: 'error',
        content: '请填写用户名',
      });
      return
    }
    if (!emailRegex.test(values.account)) {
      messageApi.open({
        type: 'error',
        content: '用户名不合法',
      });
      return
    }

    if (!values.password?.trim()) {
      messageApi.open({
        type: 'error',
        content: '请填写密码',
      });
      return
    }
    if (!passwordRegex.test(values.password)) {
      messageApi.open({
        type: 'error',
        content: '密码不合法',
      });
      return
    }


    setLoading(true);
    try {
      const loginData: Record<string, any> = {
        email: values.account,
        password: values.password,
        language: "zh-Hans",
        remember_me: true,
      }
      const res = await login({
        url: '/login',
        body: loginData,
      })
      if (res.result === 'success') {
        localStorage.setItem('console_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        router.replace(setting.fistPage)
      }
      else if (res.code === 'account_not_found') {
        messageApi.open({
          type: 'error',
          content: '账号不存在',
        });
      }
      else {
        messageApi.open({
          type: 'error',
          content: res.data,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {contextHolder}
    <div className={styles.loginBox}>
      <Form
        initialValues={{
          account: "wangxule@dhcc.com.cn",
          password: "hhny&dhcc@ai1666",
        }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item name="account">
          <Input
            prefix={<UserOutlined />}
            maxLength={100}
            allowClear
          />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password
            prefix={<LockOutlined />}
            maxLength={100}
            allowClear
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className={styles.loginBtn}
        >
          登 录
        </Button>
      </Form>
    </div>
    </>
  );
};

export default LoginForm;
