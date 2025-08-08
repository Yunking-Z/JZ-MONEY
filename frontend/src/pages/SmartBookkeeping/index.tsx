import React from 'react';
import { Card, Row, Col, Table, Button, message } from 'antd';
import { CheckOutlined, PlusOutlined, SettingOutlined, InfoOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SmartBookkeeping: React.FC = () => {
  // 模拟数据
  const smartRecords = [
    { id: 1, date: '2025-08-01', description: '自动记账 - 餐饮', amount: 200, category: '餐饮', status: '已确认' },
    { id: 2, date: '2025-08-02', description: '自动记账 - 购物', amount: 500, category: '购物', status: '已确认' },
    { id: 3, date: '2025-08-03', description: '自动记账 - 工资', amount: 10000, category: '工资', status: '已确认' },
    { id: 4, date: '2025-08-04', description: '自动记账 - 交通', amount: 50, category: '交通', status: '已确认' },
    { id: 5, date: '2025-08-05', description: '自动记账 - 娱乐', amount: 300, category: '娱乐', status: '待确认' },
  ];

  const accuracyData = [
    { name: '周一', accuracy: 95 },
    { name: '周二', accuracy: 97 },
    { name: '周三', accuracy: 96 },
    { name: '周四', accuracy: 94 },
    { name: '周五', accuracy: 98 },
    { name: '周六', accuracy: 97 },
    { name: '周日', accuracy: 96 },
  ];

  // 列配置
  const columns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: (amount: number) => `¥${amount}` },
    { title: '分类', dataIndex: 'category', key: 'category' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === '已确认' ? '#52c41a' : '#faad14' }}>{status}</span>
      ),
    },
  ];

  const handleConfirmAll = () => {
    message.info('确认所有记录的功能正在开发中');
  };

  const handleAddTransaction = () => {
    // 这里可以导航到添加交易页面
    message.info('跳转到添加交易页面的功能正在开发中');
  };

  const handleSettings = () => {
    message.info('记账规则设置功能正在开发中');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>智能记账</h1>
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={24} md={8}>
          <Card title="智能记账状态">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ marginRight: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>96%</div>
                <div style={{ fontSize: '14px', color: '#666' }}>本周准确率</div>
              </div>
              <div style={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[90, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value: any) => `${value}%`} />
                    <Line type="monotone" dataKey="accuracy" stroke="#1890ff" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
            type="primary"
            icon={<CheckOutlined />}
            style={{ flex: 1 }}
            onClick={handleConfirmAll}
          >
            确认所有记录
          </Button>
              <Button
                  type="default"
                  icon={<SettingOutlined />}
                  onClick={handleSettings}
                >
                  规则设置
                </Button>
            </div>
          </Card>
        </Col>
        <Col span={24} md={16}>
          <Card title="最近智能记账记录">
            <Table
              dataSource={smartRecords}
              columns={columns}
              rowKey="id"
              pagination={false}
              style={{ marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddTransaction}
              >
                手动添加交易
              </Button>
              <Button type="link">查看更多</Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="智能记账说明">
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <InfoOutlined style={{ color: '#1890ff', marginRight: '8px', marginTop: '4px' }} />
          <div>
            <p>智能记账功能可以自动识别您的交易记录并进行分类，帮助您节省记账时间。</p>
            <p style={{ marginTop: '8px' }}>目前支持的银行和支付平台：支付宝、微信支付、招商银行、工商银行、建设银行（更多平台持续接入中）</p>
            <p style={{ marginTop: '8px', color: '#faad14' }}>注：智能记账功能处于测试阶段，部分交易可能需要手动确认或分类。</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SmartBookkeeping;