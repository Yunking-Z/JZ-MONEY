import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 认证中间件
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // 从请求头获取token
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: '未提供认证令牌' });
  }
  
  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { id: number; username: string; email: string };
    
    // 将用户信息添加到请求对象
    (req as any).user = decoded;
    
    next();
  } catch (error) {
    console.error('认证失败:', error);
    res.status(401).json({ message: '无效的认证令牌' });
  }
};