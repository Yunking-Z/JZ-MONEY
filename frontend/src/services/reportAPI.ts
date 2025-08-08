import api from './api';
import { ReportResponse, IncomeExpenseReport, CategoryExpenseReport, AccountBalanceReport } from '../types/report';

// 获取收入支出报表
export const getIncomeExpenseReport = async (params: { startDate: string; endDate: string }) => {
  try {
    const response = await api.get('/reports/income-expense', { params });
    return response as unknown as ReportResponse;
  } catch (error) {
    console.error('获取收入支出报表失败:', error);
    throw error;
  }
};

// 获取分类支出报表
export const getCategoryExpenseReport = async (params: { startDate: string; endDate: string }) => {
  try {
    const response = await api.get('/reports/category-expense', { params });
    return response as unknown as ReportResponse;
  } catch (error) {
    console.error('获取分类支出报表失败:', error);
    throw error;
  }
};

// 获取账户余额报表
export const getAccountBalanceReport = async () => {
  try {
    const response = await api.get('/reports/account-balance');
    return response as unknown as ReportResponse;
  } catch (error) {
    console.error('获取账户余额报表失败:', error);
    throw error;
  }
};