import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AssetOverview: React.FC = () => {
  // 模拟数据
  const assetData = [
    { name: '现金', value: 5000 },
    { name: '银行卡', value: 25000 },
    { name: '投资', value: 15000 },
    { name: '其他', value: 5000 },
  ];

  const monthlyData = [
    { name: '一月', income: 10000, expense: 6000 },
    { name: '二月', income: 12000, expense: 7000 },
    { name: '三月', income: 11000, expense: 6500 },
    { name: '四月', income: 13000, expense: 7500 },
    { name: '五月', income: 14000, expense: 8000 },
    { name: '六月', income: 15000, expense: 8500 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div style={{ padding: '24px' }}>
      <h1>资产总览</h1>
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={24} md={6}>
          <Card title="总资产">
            <Statistic
              title="" 
              value={50000}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="本月收入">
            <Statistic
              title="" 
              value={15000}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="本月支出">
            <Statistic
              title="" 
              value={8500}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="本月结余">
            <Statistic
              title="" 
              value={6500}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              prefix="¥"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Card title="资产分布">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `¥${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card title="月度收支趋势">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => `¥${value}`} />
                <Legend />
                <Bar dataKey="income" name="收入" fill="#0088FE" />
                <Bar dataKey="expense" name="支出" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AssetOverview;