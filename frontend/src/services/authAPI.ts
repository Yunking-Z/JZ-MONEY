import api from './api';

// 请求拦截器已经在api.ts中设置
// 这里可以添加特定于认证的请求处理逻辑

// 响应拦截器已经在api.ts中设置
// 这里可以添加特定于认证的响应处理逻辑

import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/user';

// 登录接口
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', credentials);
    // 保存token到本地存储
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data as unknown as AuthResponse;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 注册接口
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data as unknown as AuthResponse;
  } catch (error) {
    console.error('注册失败:', error);
    throw error;
  }
};

// 获取当前用户信息
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/auth/me');
    return response.data as unknown as User;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

// 登出
export const logout = (): void => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// 检查是否已登录
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');
};