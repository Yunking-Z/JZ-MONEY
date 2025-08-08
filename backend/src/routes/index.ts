import { Express } from 'express';
import authRoutes from './authRoutes';
import transactionRoutes from './transactionRoutes';
import accountRoutes from './accountRoutes';
import reportRoutes from './reportRoutes';
import { authenticateToken } from '../middleware/auth';

// 注册所有路由
export function registerRoutes(app: Express) {
  // 公开路由
  app.use('/api/auth', authRoutes);
  
  // 需要认证的路由
  app.use('/api/transactions', authenticateToken, transactionRoutes);
  app.use('/api/accounts', authenticateToken, accountRoutes);
  app.use('/api/reports', authenticateToken, reportRoutes);
}