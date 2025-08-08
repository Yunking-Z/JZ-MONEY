import api from './api';
import { TransactionCreateData, TransactionUpdateData, TransactionResponse } from '../types/transaction';

// 获取交易记录列表
export const getTransactions = async (params?: { page?: number; limit?: number; startDate?: string; endDate?: string }) => {
  try {
    const response = await api.get('/transactions', { params });
    return response as unknown as TransactionResponse;
  } catch (error) {
    console.error('获取交易记录失败:', error);
    throw error;
  }
};

// 获取单个交易记录
export const getTransactionById = async (id: string) => {
  try {
    const response = await api.get(`/transactions/${id}`);
    return response as unknown as TransactionResponse;
  } catch (error) {
    console.error('获取交易记录详情失败:', error);
    throw error;
  }
};

// 创建交易记录
export const addTransaction = async (data: TransactionCreateData) => {
  try {
    const response = await api.post('/transactions', data);
    return response as unknown as TransactionResponse;
  } catch (error) {
    console.error('创建交易记录失败:', error);
    throw error;
  }
};

export const createTransaction = addTransaction; // 保留旧名称以兼容可能的引用

// 更新交易记录
export const updateTransaction = async (id: string, data: TransactionUpdateData) => {
  try {
    const response = await api.put(`/transactions/${id}`, data);
    return response as unknown as TransactionResponse;
  } catch (error) {
    console.error('更新交易记录失败:', error);
    throw error;
  }
};

// 删除交易记录
export const deleteTransaction = async (id: string) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response as unknown as TransactionResponse;
  } catch (error) {
    console.error('删除交易记录失败:', error);
    throw error;
  }
};