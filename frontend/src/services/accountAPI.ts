import api from './api';
import { Account, AccountCreateData, AccountUpdateData, AccountResponse } from '../types/account';

// 获取账户列表
export const getAccounts = async () => {
  try {
    const response = await api.get('/accounts');
    return response as unknown as AccountResponse;
  } catch (error) {
    console.error('获取账户列表失败:', error);
    throw error;
  }
};

// 获取单个账户
export const getAccountById = async (id: string) => {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response as unknown as AccountResponse;
  } catch (error) {
    console.error('获取账户详情失败:', error);
    throw error;
  }
};

// 创建账户
export const createAccount = async (data: AccountCreateData) => {
  try {
    const response = await api.post('/accounts', data);
    return response as unknown as AccountResponse;
  } catch (error) {
    console.error('创建账户失败:', error);
    throw error;
  }
};

// 更新账户
export const updateAccount = async (data: AccountUpdateData) => {
  try {
    const response = await api.put(`/accounts/${data.id}`, data);
    return response as unknown as AccountResponse;
  } catch (error) {
    console.error('更新账户失败:', error);
    throw error;
  }
};

// 删除账户
export const deleteAccount = async (id: string) => {
  try {
    const response = await api.delete(`/accounts/${id}`);
    return response as unknown as AccountResponse;
  } catch (error) {
    console.error('删除账户失败:', error);
    throw error;
  }
};