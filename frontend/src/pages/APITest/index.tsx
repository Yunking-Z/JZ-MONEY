import React, { useState } from 'react';
import { Button, Card, message, Divider, Table } from 'antd';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../services/transactionAPI';
import { Transaction, TransactionCreateData, TransactionUpdateData, TransactionResponse } from '../../types/transaction';
import { isLoggedIn } from '../../services/authAPI';

const APITest: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 测试获取交易记录
  const testGetTransactions = async () => {
    if (!isLoggedIn()) {
      message.error('请先登录');
      return;
    }

    setLoading(true);
    try {
      const response: TransactionResponse = await getTransactions();
      if (response.success) {
        setTransactions(Array.isArray(response.data) ? response.data : []);
        setTestResult('获取交易记录成功');
        message.success('获取交易记录成功');
      } else {
        setTestResult('获取交易记录失败: ' + response.message);
        message.error('获取交易记录失败');
      }
    } catch (error) {
      setTestResult('获取交易记录异常: ' + String(error));
      message.error('获取交易记录异常');
      console.error('Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 测试添加交易记录
  const testAddTransaction = async () => {
    if (!isLoggedIn()) {
      message.error('请先登录');
      return;
    }

    const testData: TransactionCreateData = {
      type: 'expense',
      category: '餐饮',
      amount: 99.99,
      date: new Date().toISOString().split('T')[0],
      description: '测试添加的交易记录',
      accountId: '1' // 假设默认账户ID为1
    };

    setLoading(true);
    try {
      const response: TransactionResponse = await addTransaction(testData);
      if (response.success) {
        setTestResult('添加交易记录成功，ID: ' + (response.data && !Array.isArray(response.data) ? response.data.id : '未知'));
        message.success('添加交易记录成功');
        testGetTransactions(); // 刷新列表
      } else {
        setTestResult('添加交易记录失败: ' + response.message);
        message.error('添加交易记录失败');
      }
    } catch (error) {
      setTestResult('添加交易记录异常: ' + String(error));
      message.error('添加交易记录异常');
      console.error('Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 测试更新交易记录
  const testUpdateTransaction = async () => {
    if (!isLoggedIn()) {
      message.error('请先登录');
      return;
    }

    if (transactions.length === 0) {
      message.error('没有可更新的交易记录，请先获取或添加');
      return;
    }

    const firstTransaction = transactions[0];
    const updateData: TransactionUpdateData = {
      ...firstTransaction,
      amount: firstTransaction.amount + 10,
      description: firstTransaction.description + ' (已更新)'
    };

    setLoading(true);
    try {
      const response: TransactionResponse = await updateTransaction(firstTransaction.id, updateData);
      if (response.success) {
        setTestResult('更新交易记录成功，ID: ' + firstTransaction.id);
        message.success('更新交易记录成功');
        testGetTransactions(); // 刷新列表
      } else {
        setTestResult('更新交易记录失败: ' + response.message);
        message.error('更新交易记录失败');
      }
    } catch (error) {
      setTestResult('更新交易记录异常: ' + String(error));
      message.error('更新交易记录异常');
      console.error('Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 测试删除交易记录
  const testDeleteTransaction = async () => {
    if (!isLoggedIn()) {
      message.error('请先登录');
      return;
    }

    if (transactions.length === 0) {
      message.error('没有可删除的交易记录，请先获取或添加');
      return;
    }

    const lastTransaction = transactions[transactions.length - 1];

    setLoading(true);
    try {
      const response: TransactionResponse = await deleteTransaction(lastTransaction.id);
      if (response.success) {
        setTestResult('删除交易记录成功，ID: ' + lastTransaction.id);
        message.success('删除交易记录成功');
        testGetTransactions(); // 刷新列表
      } else {
        setTestResult('删除交易记录失败: ' + response.message);
        message.error('删除交易记录失败');
      }
    } catch (error) {
      setTestResult('删除交易记录异常: ' + String(error));
      message.error('删除交易记录异常');
      console.error('Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '类型', dataIndex: 'type', key: 'type', render: (type: string) => type === 'income' ? '收入' : '支出' },
    { title: '分类', dataIndex: 'category', key: 'category' },
    { title: '金额', dataIndex: 'amount', key: 'amount' },
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '描述', dataIndex: 'description', key: 'description' }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>API测试页面</h1>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={testGetTransactions} loading={loading} style={{ marginRight: 8 }}>
            测试获取交易记录
          </Button>
          <Button type="primary" onClick={testAddTransaction} loading={loading} style={{ marginRight: 8 }}>
            测试添加交易记录
          </Button>
          <Button type="primary" onClick={testUpdateTransaction} loading={loading} style={{ marginRight: 8 }}>
            测试更新交易记录
          </Button>
          <Button type="primary" onClick={testDeleteTransaction} loading={loading}>
            测试删除交易记录
          </Button>
        </div>

        <Divider />

        <div style={{ marginBottom: 16 }}>
          <h3>测试结果:</h3>
          <p>{testResult}</p>
        </div>

        <div>
          <h3>交易记录数据:</h3>
          <Table
            columns={columns}
            dataSource={transactions}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Card>
    </div>
  );
};

export default APITest;