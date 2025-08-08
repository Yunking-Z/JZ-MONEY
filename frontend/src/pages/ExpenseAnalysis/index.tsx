import React, { useState } from 'react';
import { Card, Row, Col, Select, DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { CalendarOutlined, FilterOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ExpenseAnalysis: React.FC = () => {
  // 模拟数据
  const categoryData = [
    { name: '餐饮', value: 3500 },
    { name: '购物', value: 2500 },
    { name: '交通', value: 1000 },
    { name: '娱乐', value: 1500 },
    { name: '住房', value: 3000 },
    { name: '其他', value: 1000 },
  ];

  const monthlyData = [
    { name: '一月', 餐饮: 2800, 购物: 2000, 交通: 800, 娱乐: 1200, 住房: 3000 },
    { name: '二月', 餐饮: 3200, 购物: 2500, 交通: 900, 娱乐: 1500, 住房: 3000 },
    { name: '三月', 餐饮: 3000, 购物: 2200, 交通: 850, 娱乐: 1300, 住房: 3000 },
    { name: '四月', 餐饮: 3300, 购物: 2400, 交通: 950, 娱乐: 1400, 住房: 3000 },
    { name: '五月', 餐饮: 3500, 购物: 2800, 交通: 1000, 娱乐: 1600, 住房: 3000 },
    { name: '六月', 餐饮: 3800, 购物: 2600, 交通: 1100, 娱乐: 1800, 住房: 3000 },
  ];

  const trendData = [
    { name: '一月', 总支出: 10800 },
    { name: '二月', 总支出: 11100 },
    { name: '三月', 总支出: 10350 },
    { name: '四月', 总支出: 10950 },
    { name: '五月', 总支出: 12100 },
    { name: '六月', 总支出: 13100 },
  ];

  const [timeRange, setTimeRange] = useState('month');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div style={{ padding: '24px' }}>
      <h1>支出分析</h1>
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={24} md={8}>
          <Select
            placeholder="选择时间范围"
            prefix={<FilterOutlined />}
            value={timeRange}
            onChange={(value) => setTimeRange(value)}
            style={{ width: '100%' }}
          >
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
            <Option value="quarter">本季度</Option>
            <Option value="year">本年</Option>
            <Option value="custom">自定义</Option>
          </Select>
        </Col>
        {timeRange === 'custom' && (
          <Col span={24} md={8}>
            <RangePicker
              prefix={<CalendarOutlined />}
              value={dateRange}
              onChange={(dates) => setDateRange(dates || [null, null])}
              style={{ width: '100%' }}
            />
          </Col>
        )}
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Card title="支出分类占比">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `¥${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card title="月度支出趋势">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value}`} />
                <Legend />
                <Line type="monotone" dataKey="总支出" stroke="#FF8042" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="分类月度对比">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value}`} />
                <Legend />
                <Bar dataKey="餐饮" stackId="a" fill="#0088FE" />
                <Bar dataKey="购物" stackId="a" fill="#00C49F" />
                <Bar dataKey="交通" stackId="a" fill="#FFBB28" />
                <Bar dataKey="娱乐" stackId="a" fill="#FF8042" />
                <Bar dataKey="住房" stackId="a" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseAnalysis;