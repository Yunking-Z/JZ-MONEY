import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, message, Spin, DatePicker, Select, Form, Input, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { getTransactions, deleteTransaction } from '../../services/transactionAPI';
import { Transaction, TransactionResponse } from '../../types/transaction';
import { isLoggedIn } from '../../services/authAPI';
import dayjs from 'dayjs';
import 'dayjs/plugin/isBetween';
import AddTransactionModal from './AddTransactionModal';
import UpdateTransactionModal from './UpdateTransactionModal';

// 删除文件中定义的重复组件
// const AddTransactionModal: React.FC<{
//   visible: boolean;
//   onCancel: () => void;
//   onSuccess: () => void;
// }> = ({ visible, onCancel, onSuccess }) => {
//   // 简化实现，实际项目中应该有完整的表单和提交逻辑
//   return (
//     <div>Modal content would go here</div>
//   );
// };

// const UpdateTransactionModal: React.FC<{
//   visible: boolean;
//   transaction: Transaction;
//   onCancel: () => void;
//   onSuccess: () => void;
// }> = ({ visible, transaction, onCancel, onSuccess }) => {
//   // 简化实现，实际项目中应该有完整的表单和提交逻辑
//   return (
//     <div>Modal content would go here</div>
//   );
// }>;

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionRecords: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchParams, setSearchParams] = useState<{
    startDate?: string;
    endDate?: string;
    type?: 'income' | 'expense' | '';
    keyword?: string;
  }>({});
  const [form] = Form.useForm();

  // 初始化dayjs isBetween插件
  dayjs.extend(require('dayjs/plugin/isBetween'));

  // 加载交易记录
  const loadTransactions = useCallback(async () => {
    if (!isLoggedIn()) {
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    try {
      const response: TransactionResponse = await getTransactions(searchParams);
      if (response.success && Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        message.error('获取交易记录失败');
      }
    } catch (err) {
      setError('获取交易记录失败，请稍后重试');
      console.error('Failed to load transactions:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // 删除交易记录
  const handleDelete = async (id: string) => {
    try {
      const response: TransactionResponse = await deleteTransaction(id);
      if (response.success) {
        message.success('删除成功');
        loadTransactions(); // 重新加载列表
      } else {
        message.error('删除失败');
      }
    } catch (err) {
      message.error('删除失败，请稍后重试');
      console.error('Failed to delete transaction:', err);
    }
  };

  // 搜索交易记录
  const handleSearch = () => {
    form.validateFields().then(values => {
      const formattedParams = {
        ...values,
        startDate: values.dateRange?.[0]?.format('YYYY-MM-DD'),
        endDate: values.dateRange?.[1]?.format('YYYY-MM-DD'),
        keyword: values.keyword || undefined,
        type: values.type || undefined
      };
      delete formattedParams.dateRange;
      setSearchParams(formattedParams);
      loadTransactions();
    });
  };

  // 重置搜索
  const handleReset = () => {
    form.resetFields();
    setSearchParams({});
    loadTransactions();
  };

  // 打开编辑模态框
  const handleEdit = (record: Transaction) => {
    setSelectedTransaction(record);
    setUpdateModalVisible(true);
  };

  // 组件加载时获取数据
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // 列配置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (value: 'income' | 'expense') => (
        <span style={{ color: value === 'income' ? '#3f8600' : '#cf1322' }}>
          {value === 'income' ? '收入' : '支出'}
        </span>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (value: number, record: Transaction) => (
        <span style={{ color: record.type === 'income' ? '#3f8600' : '#cf1322' }}>
          ¥{value.toFixed(2)}
        </span>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: Transaction) => (
        <div>
          <Button
            icon={<EditOutlined />}
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </div>
      )
    }
  ];

  // 分类选项已移除，因为未使用
  // const categories = ['全部', '餐饮', '购物', '交通', '娱乐', '工资', '兼职'];

  // 创建添加和编辑交易记录的模态框组件
  // 组件已从外部导入
// AddTransactionModal 和 UpdateTransactionModal 组件的实现移至单独文件中

  return (
    <div style={{ padding: '24px' }}>
      <h1>交易记录管理</h1>
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Form form={form} layout="inline" style={{ flex: 1 }}>
            <Form.Item name="dateRange" label="日期范围">
              <RangePicker />
            </Form.Item>
            <Form.Item name="type" label="类型">
              <Select style={{ width: 120 }} placeholder="全部类型">
                <Option value="">全部类型</Option>
                <Option value="income">收入</Option>
                <Option value="expense">支出</Option>
              </Select>
            </Form.Item>
            <Form.Item name="keyword" label="关键词">
              <Input placeholder="描述或分类" style={{ width: 150 }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                搜索
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={handleReset}>重置</Button>
            </Form.Item>
          </Form>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModalVisible(true)}
          >
            添加交易
          </Button>
        </div>

        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={transactions}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </Card>

      <AddTransactionModal
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onSuccess={loadTransactions}
      />

      {selectedTransaction && (
        <UpdateTransactionModal
          visible={updateModalVisible}
          transaction={selectedTransaction}
          onCancel={() => setUpdateModalVisible(false)}
          onSuccess={loadTransactions}
        />
      )}
    </div>
  );
};

export default TransactionRecords;