import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/db';

// 获取收入支出报表
export const getIncomeExpenseReport = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { startDate, endDate, period = 'monthly' } = req.query;
    
    // 验证日期
    if (!startDate || !endDate) {
      return res.status(400).json({ message: '请提供开始日期和结束日期' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 构建日期格式化字符串
    let dateFormat = '%Y-%m'; // 默认为月度
    if (period === 'daily') {
      dateFormat = '%Y-%m-%d';
    } else if (period === 'weekly') {
      dateFormat = '%Y-%u';
    } else if (period === 'yearly') {
      dateFormat = '%Y';
    }
    
    // 获取收入数据
    const [incomeData] = await connection.query(
      `SELECT DATE_FORMAT(date, ?) as period, SUM(amount) as total
       FROM transactions
       WHERE user_id = ? AND type = 'income' AND date BETWEEN ? AND ?
       GROUP BY period
       ORDER BY period`,
      [dateFormat, userId, startDate, endDate]
    );
    
    // 获取支出数据
    const [expenseData] = await connection.query(
      `SELECT DATE_FORMAT(date, ?) as period, SUM(amount) as total
       FROM transactions
       WHERE user_id = ? AND type = 'expense' AND date BETWEEN ? AND ?
       GROUP BY period
       ORDER BY period`,
      [dateFormat, userId, startDate, endDate]
    );
    
    // 获取总收入和总支出
    const [totalIncomeResult] = await connection.query(
      'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = \'income\' AND date BETWEEN ? AND ?',
      [userId, startDate, endDate]
    );
    
    const [totalExpenseResult] = await connection.query(
      'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = \'expense\' AND date BETWEEN ? AND ?',
      [userId, startDate, endDate]
    );
    
    const totalIncome = (totalIncomeResult as any[])[0].total || 0;
    const totalExpense = (totalExpenseResult as any[])[0].total || 0;
    const netIncome = totalIncome - totalExpense;
    
    await connection.end();
    
    res.json({
      period,
      startDate,
      endDate,
      totalIncome,
      totalExpense,
      netIncome,
      incomeData,
      expenseData
    });
  } catch (error) {
    console.error('获取收入支出报表失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取分类支出报表
export const getCategoryExpenseReport = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { startDate, endDate } = req.query;
    
    // 验证日期
    if (!startDate || !endDate) {
      return res.status(400).json({ message: '请提供开始日期和结束日期' });
    }
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 获取分类支出数据
    const [categoryData] = await connection.query(
      `SELECT category, SUM(amount) as total
       FROM transactions
       WHERE user_id = ? AND type = 'expense' AND date BETWEEN ? AND ?
       GROUP BY category
       ORDER BY total DESC`,
      [userId, startDate, endDate]
    );
    
    await connection.end();
    
    res.json({
      startDate,
      endDate,
      categoryData
    });
  } catch (error) {
    console.error('获取分类支出报表失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取账户余额报表
export const getAccountBalanceReport = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    
    // 连接数据库
    const connection = await mysql.createConnection(dbConfig);
    
    // 获取账户余额数据
    const [accountData] = await connection.query(
      `SELECT name, type, balance, currency
       FROM accounts
       WHERE user_id = ?
       ORDER BY balance DESC`,
      [userId]
    );
    
    // 获取总资产
    const [totalResult] = await connection.query(
      'SELECT SUM(balance) as total FROM accounts WHERE user_id = ?',
      [userId]
    );
    
    const totalBalance = (totalResult as any)?.total || 0;
    
    await connection.end();
    
    res.json({
      totalBalance,
      accountData
    });
  } catch (error) {
    console.error('获取账户余额报表失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};