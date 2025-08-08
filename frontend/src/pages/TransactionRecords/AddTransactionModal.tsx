import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message } from 'antd';
import { addTransaction } from '../../services/transactionAPI';
import { TransactionCreateData, TransactionResponse } from '../../types/transaction';

const { Option } = Select;

interface AddTransactionModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [type, setType] = useState<'income' | 'expense' | ''>('');
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);

  // 提交表单
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const transactionData: TransactionCreateData = {
        ...values,
        date: values.date.format('YYYY-MM-DD')
      };

      const response: TransactionResponse = await addTransaction(transactionData);
      if (response.success) {
        message.success('添加成功');
        form.resetFields();
        onCancel();
        onSuccess();
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      message.error('添加失败，请检查输入');
      console.error('Failed to add transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  // 收入分类选项
  const incomeCategories = ['工资', '兼职', '投资收益', '礼金', '其他收入'];
  // 支出分类选项
  const expenseCategories = ['餐饮', '购物', '交通', '娱乐', '住房', '医疗', '教育', '其他支出'];

  // 获取当前类型对应的分类选项
  const currentCategories = type === 'income' ? incomeCategories : type === 'expense' ? expenseCategories : [];

  return (
    <Modal
      title="添加交易记录"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="type" label="交易类型" rules={[{ required: true }]}>
          <Select
            placeholder="选择交易类型"
            onChange={(value) => setType(value as 'income' | 'expense' | '')}
          >
            <Option value="income">收入</Option>
            <Option value="expense">支出</Option>
          </Select>
        </Form.Item>
        <Form.Item name="category" label="分类" rules={[{ required: true }]}>
          <Select placeholder="选择分类">
            {currentCategories.length > 0 ? (
              currentCategories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))
            ) : (
              <Option value="">请先选择交易类型</Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="金额" rules={[{ required: true, type: 'number', min: 0.01 }]}>
          <Input type="number" placeholder="输入金额" />
        </Form.Item>
        <Form.Item name="date" label="日期" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="description" label="描述" rules={[{ max: 200 }]}>
          <Input.TextArea rows={4} placeholder="输入描述" />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTransactionModal;