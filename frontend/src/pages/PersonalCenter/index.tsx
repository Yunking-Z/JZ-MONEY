import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Button, List, Divider, message, Modal } from 'antd';
import { UserOutlined, SettingOutlined, BellOutlined, QuestionCircleOutlined, LogoutOutlined, EditOutlined, BankOutlined, CreditCardOutlined, DollarOutlined, LockOutlined } from '@ant-design/icons';

const PersonalCenter: React.FC = () => {
  // 模拟用户数据
  const userInfo = {
    name: '张三',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    membership: '普通会员',
    joinDate: '2025-01-15',
  };

  const [editMode, setEditMode] = useState(false);

  // 个人中心菜单项
  const menuItems = [
    { id: 1, icon: <BankOutlined />, title: '银行卡管理', description: '管理您的银行卡和支付方式' },
    { id: 2, icon: <CreditCardOutlined />, title: '会员服务', description: '查看和升级您的会员等级' },
    { id: 3, icon: <DollarOutlined />, title: '账单导出', description: '导出您的交易记录和财务报表' },
    { id: 4, icon: <SettingOutlined />, title: '账户设置', description: '修改个人信息和账户安全设置' },
    { id: 5, icon: <LockOutlined />, title: '隐私政策', description: '查看我们的隐私政策和数据安全' },
    { id: 6, icon: <QuestionCircleOutlined />, title: '帮助中心', description: '获取帮助和常见问题解答' },
  ];

  const handleEdit = () => {
    setEditMode(!editMode);
    if (editMode) {
      // 模拟保存操作
      message.success('个人信息更新成功');
    }
  };

  const handleLogout = () => {
    Modal.confirm({
      title: '确认退出',
      content: '确定要退出登录吗？',
      onOk: () => {
        message.success('已退出登录');
        // 这里可以添加退出登录的逻辑
      },
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>个人中心</h1>
      <Row gutter={[16, 16]}>
        <Col span={24} md={6}>
          <Card style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0' }}>
              <Avatar
                src={userInfo.avatar}
                size={100}
                icon={<UserOutlined />}
                style={{ marginBottom: '16px' }}
              />
              <h2 style={{ marginBottom: '8px' }}>{userInfo.name}</h2>
              <p style={{ color: '#666', marginBottom: '16px' }}>{userInfo.membership}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  type="primary"
                  icon={editMode ? <SaveOutlined /> : <EditOutlined />}
                  onClick={handleEdit}
                >
                  {editMode ? '保存' : '编辑资料'}
                </Button>
                <Button
                  type="default"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  退出登录
                </Button>
              </div>
            </div>

            <Divider />

            <List
              dataSource={[
                { label: '邮箱', value: userInfo.email },
                { label: '手机', value: userInfo.phone },
                { label: '注册日期', value: userInfo.joinDate },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.label}
                    description={item.value}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={24} md={18}>
          <Card title="功能中心">
            <Row gutter={[16, 16]}>
              {menuItems.map(item => (
                <Col key={item.id} span={24} md={12} lg={8}>
                  <Button
                    type="default"
                    icon={item.icon}
                    style={{
                      width: '100%',
                      height: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      padding: '16px',
                    }}
                    onClick={() => message.info(`${item.title}功能正在开发中`)}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{item.description}</div>
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>

          <Card title="通知中心" style={{ marginTop: '16px' }}>
            <List
              dataSource={[
                { id: 1, title: '账户安全提醒', content: '您的账户于2025-08-01 10:00登录了新设备', time: '今天' },
                { id: 2, title: '记账提醒', content: '您有一笔交易待确认', time: '昨天' },
                { id: 3, title: '系统更新通知', content: '我们已于2025-07-30完成系统更新，新增了多项功能', time: '3天前' },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[<span style={{ color: '#666' }}>{item.time}</span>]}
                >
                  <BellOutlined style={{ color: '#1890ff', marginRight: '16px' }} />
                  <List.Item.Meta
                    title={item.title}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// 缺少的SaveOutlined组件定义
const SaveOutlined = () => {
  return <EditOutlined />; // 临时使用EditOutlined代替，实际开发中应导入正确的组件
};

export default PersonalCenter;