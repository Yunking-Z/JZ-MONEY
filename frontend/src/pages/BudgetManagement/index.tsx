import React, { useState } from 'react';
import { Card, Row, Col, Table, InputNumber, Button, message, Select } from 'antd';
import { PlusOutlined, MinusOutlined, EditOutlined, SaveOutlined, BarChartOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const { Option } = Select;

const BudgetManagement: React.FC = () => {
  // 模拟数据
  const [budgets, setBudgets] = useState([
    { id: 1, category: '餐饮', amount: 3000, used: 1800, remaining: 1200, percentage: 60 },
    { id: 2, category: '购物', amount: 2000, used: 1200, remaining: 800, percentage: 60 },
    { id: 3, category: '交通', amount: 1000, used: 400, remaining: 600, percentage: 40 },
    { id: 4, category: '娱乐', amount: 1500, used: 900, remaining: 600, percentage: 60 },
    { id: 5, category: '住房', amount: 3000, used: 3000, remaining: 0, percentage: 100 },
    { id: 6, category: '其他', amount: 1000, used: 300, remaining: 700, percentage: 30 },
  ]);

  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newAmount, setNewAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState('餐饮');
  const [newCategoryBudget, setNewCategoryBudget] = useState<number>(0);

  // 预算使用数据
  const budgetData = budgets.map(budget => ({
    name: budget.category,
    预算: budget.amount,
    已使用: budget.used,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // 编辑预算
  const handleEdit = (id: number, currentAmount: number) => {
    setIsEditing(id);
    setNewAmount(currentAmount);
  };

  // 保存预算
  const handleSave = (id: number) => {
    if (newAmount <= 0) {
      message.error('预算金额必须大于0');
      return;
    }

    const updatedBudgets = budgets.map(budget => {
      if (budget.id === id) {
        const percentage = Math.round((budget.used / newAmount) * 100);
        return {
          ...budget,
          amount: newAmount,
          remaining: newAmount - budget.used,
          percentage: percentage > 100 ? 100 : percentage,
        };
      }
      return budget;
    });

    setBudgets(updatedBudgets);
    setIsEditing(null);
    message.success('预算更新成功');
  };

  // 添加新预算
  const handleAddBudget = () => {
    if (newCategoryBudget <= 0) {
      message.error('预算金额必须大于0');
      return;
    }

    // 检查分类是否已存在
    const exists = budgets.some(budget => budget.category === selectedCategory);
    if (exists) {
      message.error('该分类的预算已存在');
      return;
    }

    const newId = Math.max(...budgets.map(budget => budget.id)) + 1;
    const newBudget = {
      id: newId,
      category: selectedCategory,
      amount: newCategoryBudget,
      used: 0,
      remaining: newCategoryBudget,
      percentage: 0,
    };

    setBudgets([...budgets, newBudget]);
    setNewCategoryBudget(0);
    message.success('预算添加成功');
  };

  // 列配置
  const columns = [
    { title: '分类', dataIndex: 'category', key: 'category' },
    { title: '预算金额', dataIndex: 'amount', key: 'amount', render: (amount: number) => `¥${amount}` },
    { title: '已使用', dataIndex: 'used', key: 'used', render: (used: number) => `¥${used}` },
    { title: '剩余', dataIndex: 'remaining', key: 'remaining', render: (remaining: number) => `¥${remaining}` },
    {
      title: '进度',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <div>
          <div style={{ width: '100%', background: '#e0e0e0', borderRadius: 4 }}>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background: percentage > 80 ? '#ff4d4f' : percentage > 60 ? '#faad14' : '#52c41a',
                width: `${percentage}%`,
              }}
            />
          </div>
          <span style={{ display: 'block', marginTop: 4 }}>{percentage}%</span>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          {isEditing === record.id ? (
            <>
              <InputNumber
                min={1}
                value={newAmount}
                onChange={(value) => setNewAmount(value as number)}
                style={{ width: 100, marginRight: 8 }}
              />
              <Button
                type="primary"
                icon={<SaveOutlined />}
                size="small"
                onClick={() => handleSave(record.id)}
              >
                保存
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record.id, record.amount)}
            >
              编辑
            </Button>
          )}
        </div>
      ),
    },
  ];

  // 分类选项
  const categories = ['餐饮', '购物', '交通', '娱乐', '住房', '其他', '医疗', '教育', '投资'];

  return (
    <div style={{ padding: '24px' }}>
      <h1>预算管理</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={24} md={8}>
          <Card title="添加新预算">
            <Row gutter={[8, 8]}>
              <Col span={24} md={12}>
                <Select
                  placeholder="选择分类"
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value)}
                  style={{ width: '100%' }}
                >
                  {categories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={24} md={8}>
                <InputNumber
                  min={1}
                  placeholder="预算金额"
                  value={newCategoryBudget}
                  onChange={(value) => setNewCategoryBudget(value as number)}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={24} md={4}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                  onClick={handleAddBudget}
                >
                  添加
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={16}>
          <Card title="预算概览">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={budgetData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value}`} />
                <Legend />
                <Bar dataKey="预算" stackId="a" fill="#8884d8" />
                <Bar dataKey="已使用" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="预算明细">
        <Table
          dataSource={budgets}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default BudgetManagement;