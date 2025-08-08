import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message } from 'antd';
import { updateTransaction } from '../../services/transactionAPI';
import { Transaction, TransactionUpdateData, TransactionResponse } from '../../types/transaction';
import dayjs from 'dayjs';

const { Option } = Select;
const { Item } = Form;

interface UpdateTransactionModalProps {
  visible: boolean;
  transaction: Transaction;
  onCancel: () => void;
  onSuccess: () => void;
}

const UpdateTransactionModal: React.FC<UpdateTransactionModalProps> = ({ visible, transaction, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [type, setType] = React.useState<'income' | 'expense' | ''>(transaction.type);

  // 收入分类选项
  const incomeCategories = ['工资', '兼职', '投资收益', '礼金', '其他收入'];
  // 支出分类选项
  const expenseCategories = ['餐饮', '购物', '交通', '娱乐', '住房', '医疗', '教育', '其他支出'];

  // 获取当前类型对应的分类选项
  const currentCategories = type === 'income' ? incomeCategories : type === 'expense' ? expenseCategories : [];

  // 初始化表单数据
  useEffect(() => {
    if (visible && transaction) {
      form.setFieldsValue({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        date: dayjs(transaction.date),
        description: transaction.description
      });
      setType(transaction.type);
    }
  }, [visible, transaction, form]);

  // 监听交易类型变化，更新分类选项
  useEffect(() => {
    if (type && type !== transaction.type) {
      form.setFieldsValue({ category: '' });
    }
  }, [type, transaction.type, form]);

  // 提交表单
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const transactionData: TransactionUpdateData = {
        ...values,
        date: values.date.format('YYYY-MM-DD')
      };

      const response: TransactionResponse = await updateTransaction(transaction.id, transactionData);
      if (response.success) {
        message.success('更新成功');
        onCancel();
        onSuccess();
      } else {
        message.error('更新失败');
      }
    } catch (error) {
      message.error('更新失败，请检查输入');
      console.error('Failed to update transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="编辑交易记录"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Item name="type" label="交易类型" rules={[{ required: true }]}>
          <Select
            placeholder="选择交易类型"
            onChange={(value) => setType(value as 'income' | 'expense' | '')}
          >
            <Option value="income">收入</Option>
            <Option value="expense">支出</Option>
          </Select>
        </Item>
        <Item name="category" label="分类" rules={[{ required: true }]}>
          <Select placeholder="选择分类">
            {currentCategories.length > 0 ? (
              currentCategories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))
            ) : (
              <Option value="">请先选择交易类型</Option>
            )}
          </Select>
        </Item>
        <Item name="amount" label="金额" rules={[{ required: true, type: 'number', min: 0.01 }]}>
          <Input type="number" placeholder="输入金额" />
        </Item>
        <Item name="date" label="日期" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Item>
        <Item name="description" label="描述" rules={[{ max: 200 }]}>
          <Input.TextArea rows={4} placeholder="输入描述" />
        </Item>
        <Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              提交
            </Button>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};

export default UpdateTransactionModal;