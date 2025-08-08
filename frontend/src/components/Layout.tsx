import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Badge, Button } from 'antd';
import {
  PieChartOutlined,
  FileTextOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  RobotOutlined,
  BookOutlined,
  PlusCircleOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  SearchOutlined,
  CodeOutlined,
}
from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // 导航菜单项
  const menuItems = [
    {
      key: '/',
      icon: <PieChartOutlined />,
      label: '资产总览',
    },
    {
      key: '/transaction-records',
      icon: <FileTextOutlined />,
      label: '交易记录',
    },
    {
      key: '/expense-analysis',
      icon: <BarChartOutlined />,
      label: '支出分析',
    },
    {
      key: '/budget-management',
      icon: <CreditCardOutlined />,
      label: '预算管理',
    },
    {
      key: '/ai-assistant',
      icon: <RobotOutlined />,
      label: 'AI助手',
    },
    {
      key: '/smart-bookkeeping',
      icon: <BookOutlined />,
      label: '智能记账',
    },
  ];

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: '#001529',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          <BookOutlined style={{ marginRight: '8px' }} />
          {!collapsed && 'JZ-MONEY'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0, backgroundColor: '#001529' }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ marginRight: '16px' }}
              />
              <div style={{ position: 'relative' }}>
                <SearchOutlined style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                  type="text"
                  placeholder="搜索..."
                  style={{
                    padding: '6px 12px 6px 36px',
                    borderRadius: '4px',
                    border: '1px solid #d9d9d9',
                    outline: 'none',
                    width: '200px',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Badge count={3} size="small">
                <Button type="text" icon={<BellOutlined />} />
              </Badge>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => navigate('/add-transaction')}
                style={{ marginRight: '16px' }}
              >
                添加交易
              </Button>
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                onClick={() => navigate('/personal-center')}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: 'white', minHeight: 280, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}>
          JZ-MONEY © {new Date().getFullYear()} 智能记账应用 - 版权所有
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;