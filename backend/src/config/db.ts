import dotenv from 'dotenv';

// 加载环境变量
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// 数据库配置
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jz_money'
};

// 测试数据库连接
import mysql from 'mysql2/promise';

export async function testDbConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('成功连接到数据库');
    await connection.end();
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error);
    return false;
  }
}