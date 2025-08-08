import React, { useState, useEffect, useMemo } from 'react';
import { Card, Form, Input, Select, DatePicker, Button, Radio, message, Row, Col } from 'antd';
import { SaveOutlined, CalendarOutlined, CreditCardOutlined, WalletOutlined, TagOutlined, InfoOutlined, RestOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

// 定义交易接口
interface Transaction {
  type: 'expense' | 'income';
  date: Dayjs;
  amount: number;
  paymentMethod: string;
  category: string;
  description?: string;
}

const AddTransaction: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [categories, setCategories] = useState<string[]>([]);

  // 交易类型选项
  const transactionTypes = [
    { label: '支出', value: 'expense' },
    { label: '收入', value: 'income' },
  ];

  // 支付方式选项
  const paymentMethods = [
    { label: '现金', value: 'cash' },
    { label: '银行卡', value: 'bank' },
    { label: '支付宝', value: 'alipay' },
    { label: '微信', value: 'wechat' },
  ];

  // 支出分类选项
  const expenseCategories = useMemo(() => [
    '餐饮', '购物', '交通', '娱乐', '住房', '医疗', '教育', '通讯', '其他'
  ], []);

  // 收入分类选项
  const incomeCategories = useMemo(() => [
    '工资', '兼职', '投资', '礼金', '其他'
  ], []);

  // 快速记账选项
  const quickTransactions = [
    { name: '早餐', amount: 15, category: '餐饮', type: 'expense', paymentMethod: 'wechat' },
    { name: '午餐', amount: 35, category: '餐饮', type: 'expense', paymentMethod: 'wechat' },
    { name: '晚餐', amount: 50, category: '餐饮', type: 'expense', paymentMethod: 'alipay' },
    { name: '公交', amount: 2, category: '交通', type: 'expense', paymentMethod: 'cash' },
    { name: '地铁', amount: 4, category: '交通', type: 'expense', paymentMethod: 'wechat' },
    { name: '超市购物', amount: 100, category: '购物', type: 'expense', paymentMethod: 'alipay' },
  ];

  // 根据交易类型更新分类
  useEffect(() => {
    setCategories(type === 'expense' ? expenseCategories : incomeCategories);
    form.setFieldValue('category', '');
  }, [type, form, expenseCategories, incomeCategories]);

  // 处理交易类型变更
  const handleTypeChange = (value: 'expense' | 'income') => {
    setType(value);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // 这里是模拟提交，实际应用中应该调用API
      const transaction: Transaction = {
        type: values.type,
        date: values.date,
        amount: parseFloat(values.amount),
        paymentMethod: values.paymentMethod,
        category: values.category,
        description: values.description
      };

      console.log('提交的交易数据:', transaction);

      setTimeout(() => {
        message.success('交易添加成功');
        form.resetFields();
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error('请填写完整信息');
      setLoading(false);
    }
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
  };

  // 快速添加交易
  const handleQuickAdd = (transaction: any) => {
    form.setFieldsValue({
      type: transaction.type,
      date: dayjs(),
      amount: transaction.amount,
      paymentMethod: transaction.paymentMethod,
      category: transaction.category,
      description: transaction.name
    });

    // 自动提交
    setTimeout(() => {
      handleSubmit();
    }, 500);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>添加交易</h1>
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ type: 'expense', date: dayjs() }}
        >
          <Form.Item name="type" label="交易类型" rules={[{ required: true }]}>
            <Radio.Group 
              options={transactionTypes} 
              onChange={e => handleTypeChange(e.target.value)} 
            />
          </Form.Item>

          <Form.Item name="date" label="交易日期" rules={[{ required: true }]}>
            <DatePicker
              suffixIcon={<CalendarOutlined />}
              style={{ width: '100%' }}
              defaultValue={dayjs()}
            />
          </Form.Item>

          <Form.Item name="amount" label="金额" rules={[
            { required: true, message: '请输入金额' },
            { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '请输入有效的金额格式(最多两位小数)' }
          ]}>
            <Input
              prefix="¥"
              placeholder="0.00"
              style={{ width: '100%' }}
              type="number"
              step="0.01"
            />
          </Form.Item>

          <Form.Item name="paymentMethod" label="支付方式" rules={[{ required: true }]}>
            <Select
              placeholder="选择支付方式"
              suffixIcon={<CreditCardOutlined />}
              style={{ width: '100%' }}
            >
              {paymentMethods.map(method => (
                <Option key={method.value} value={method.value}>{method.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="category" label="分类" rules={[{ required: true }]}>
            <Select
              placeholder="选择分类"
              suffixIcon={<TagOutlined />}
              style={{ width: '100%' }}
            >
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="description" label="描述">
            <TextArea
              placeholder="输入交易描述（可选）"
              rows={4}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  style={{ width: '100%' }}
                  onClick={handleSubmit}
                  loading={loading}
                >
                  保存交易
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  icon={<RestOutlined />}
                  style={{ width: '100%' }}
                  onClick={handleReset}
                  disabled={loading}
                >
                  重置
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>

      <Card title="快速记账" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {quickTransactions.map((item, index) => (
            <Button
              key={index}
              type="dashed"
              icon={<WalletOutlined />}
              style={{ width: 'calc(33.33% - 16px)' }}
              onClick={() => handleQuickAdd(item)}
            >
              {item.name} ¥{item.amount}
            </Button>
          ))}
        </div>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', color: '#666' }}>
          <InfoOutlined style={{ marginRight: '8px' }} />
          <span>点击快速记账按钮可一键添加常用交易</span>
        </div>
      </Card>
    </div>
  );
};

export default AddTransaction;