import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/db';

// 创建账户
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, type, balance, currency } = req.body;
    const userId = (req as any).user.id;
    
    // 验证输入
    if (!name || !type || balance === undefined) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 创建账户
    const [result] = await connection.query(
      'INSERT INTO accounts (user_id, name, type, balance, currency) VALUES (?, ?, ?, ?, ?)',
      [userId, name, type, balance, currency || 'CNY']
    );
    
    await connection.end();
    
    res.status(201).json({ message: '账户创建成功' });
  } catch (error) {
    console.error('创建账户失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取用户的所有账户
export const getAccounts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 获取账户列表
    const [accounts] = await connection.query(
      'SELECT * FROM accounts WHERE user_id = ?',
      [userId]
    );
    
    // 计算总资产
    const [totalResult] = await connection.query(
      'SELECT SUM(balance) as total FROM accounts WHERE user_id = ?',
      [userId]
    );
    
    const totalBalance = (totalResult as any[])[0].total || 0;
    
    await connection.end();
    
    res.json({
      accounts,
      totalBalance
    });
  } catch (error) {
    console.error('获取账户列表失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取特定账户详情
export const getAccountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 获取账户详情
    const [accounts] = await connection.query(
      'SELECT * FROM accounts WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if ((accounts as any[]).length === 0) {
      await connection.end();
      return res.status(404).json({ message: '账户不存在' });
    }
    
    await connection.end();
    
    res.json((accounts as any[])[0]);
  } catch (error) {
    console.error('获取账户详情失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新账户信息
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, balance, currency } = req.body;
    const userId = (req as any).user.id;
    
    // 验证输入
    if (!name || !type || balance === undefined) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 检查账户是否存在且属于当前用户
    const [accounts] = await connection.query(
      'SELECT * FROM accounts WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if ((accounts as any[]).length === 0) {
      await connection.end();
      return res.status(404).json({ message: '账户不存在' });
    }
    
    // 更新账户信息
    await connection.query(
      'UPDATE accounts SET name = ?, type = ?, balance = ?, currency = ? WHERE id = ? AND user_id = ?',
      [name, type, balance, currency || 'CNY', id, userId]
    );
    
    await connection.end();
    
    res.json({ message: '账户信息更新成功' });
  } catch (error) {
    console.error('更新账户信息失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 删除账户
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 检查账户是否存在且属于当前用户
    const [accounts] = await connection.query(
      'SELECT * FROM accounts WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if ((accounts as any[]).length === 0) {
      await connection.end();
      return res.status(404).json({ message: '账户不存在' });
    }
    
    // 删除账户
    await connection.query(
      'DELETE FROM accounts WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    await connection.end();
    
    res.json({ message: '账户删除成功' });
  } catch (error) {
    console.error('删除账户失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};