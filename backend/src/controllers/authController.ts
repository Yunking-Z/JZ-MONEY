import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbConfig } from '../config/db';

// 用户注册
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    // 验证输入
    if (!username || !email || !password) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 检查用户是否已存在
    const [existingUsers] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if ((existingUsers as any[]).length > 0) {
      await connection.end();
      return res.status(409).json({ message: '该邮箱已被注册' });
    }
    
    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // 创建新用户
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    await connection.end();
    
    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 用户登录
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // 验证输入
    if (!email || !password) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 查找用户
    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if ((users as any[]).length === 0) {
      await connection.end();
      return res.status(401).json({ message: '认证失败，用户不存在' });
    }
    
    const user = (users as any[])[0];
    
    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      await connection.end();
      return res.status(401).json({ message: '认证失败，密码错误' });
    }
    
    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    await connection.end();
    
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取当前用户信息
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // 从请求头获取token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: '未提供认证令牌' });
    }
    
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { id: number };
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 查找用户
    const [users] = await connection.query(
      'SELECT id, username, email FROM users WHERE id = ?',
      [decoded.id]
    );
    
    if ((users as any[]).length === 0) {
      await connection.end();
      return res.status(404).json({ message: '用户不存在' });
    }
    
    await connection.end();
    
    res.json((users as any[])[0]);
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(401).json({ message: '无效的认证令牌' });
  }
};