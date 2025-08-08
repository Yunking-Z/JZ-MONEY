import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '../../services/authAPI';
import { LoginCredentials } from '../../types/user';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (values: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await login(values);
      if (response && response.token) {
        message.success('登录成功');
        // 登录成功后跳转到首页
        window.location.href = '/';
      } else {
        message.error('登录失败，请检查用户名和密码');
      }
    } catch (error) {
      message.error('登录失败，请稍后重试');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card style={{ width: 400, padding: 24 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>JZ-MONEY 登录</h2>
        <Form
          form={form}
          name="login"
          onFinish={handleLogin}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p>还没有账号? <a href="/register">立即注册</a></p>
        </div>
      </Card>
    </div>
  );
};

export default Login;