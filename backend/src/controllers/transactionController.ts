import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/db';
import { authenticateToken } from '../middleware/auth';

// 创建新交易
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, category, description, date } = req.body;
    const userId = (req as any).user.id;
    
    // 验证输入
    if (!type || !amount || !category || !date) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }
    
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ message: '交易类型必须是income或expense' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 创建交易记录
    const [result] = await connection.query(
      'INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, type, amount, category, description || null, date]
    );
    
    await connection.end();
    
    res.status(201).json({ message: '交易记录创建成功' });
  } catch (error) {
    console.error('创建交易记录失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取用户的交易记录
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { page = 1, limit = 10, startDate, endDate, category } = req.query;
    
    // 计算偏移量
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    // 构建查询条件
    let query = 'SELECT * FROM transactions WHERE user_id = ?';
    const params: any[] = [userId];
    
    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    } else if (startDate) {
      query += ' AND date >= ?';
      params.push(startDate);
    } else if (endDate) {
      query += ' AND date <= ?';
      params.push(endDate);
    }
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    // 添加排序和分页
    query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit as string), offset);
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 获取交易记录
    const [transactions] = await connection.query(query, params);
    
    // 获取总记录数
    const [countResult] = await connection.query(
      'SELECT COUNT(*) as total FROM transactions WHERE user_id = ?',
      [userId]
    );
    
    const total = (countResult as any[])[0].total;
    const totalPages = Math.ceil(total / parseInt(limit as string));
    
    await connection.end();
    
    res.json({
      transactions,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages
      }
    });
  } catch (error) {
    console.error('获取交易记录失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取特定交易详情
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 获取交易详情
    const [transactions] = await connection.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if ((transactions as any[]).length === 0) {
      await connection.end();
      return res.status(404).json({ message: '交易记录不存在' });
    }
    
    await connection.end();
    
    res.json((transactions as any[])[0]);
  } catch (error) {
    console.error('获取交易详情失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新交易信息
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, amount, category, description, date } = req.body;
    const userId = (req as any).user.id;
    
    // 验证输入
    if (!type || !amount || !category || !date) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }
    
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ message: '交易类型必须是income或expense' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 检查交易是否存在且属于当前用户
    const [transactions] = await connection.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if ((transactions as any[]).length === 0) {
      await connection.end();
      return res.status(404).json({ message: '交易记录不存在' });
    }
    
    // 更新交易信息
    await connection.query(
      'UPDATE transactions SET type = ?, amount = ?, category = ?, description = ?, date = ? WHERE id = ? AND user_id = ?',
      [type, amount, category, description || null, date, id, userId]
    );
    
    await connection.end();
    
    res.json({ message: '交易记录更新成功' });
  } catch (error) {
    console.error('更新交易记录失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 删除交易记录
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 检查交易是否存在且属于当前用户
    const [transactions] = await connection.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if ((transactions as any[]).length === 0) {
      await connection.end();
      return res.status(404).json({ message: '交易记录不存在' });
    }
    
    // 删除交易记录
    await connection.query(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    await connection.end();
    
    res.json({ message: '交易记录删除成功' });
  } catch (error) {
    console.error('删除交易记录失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};