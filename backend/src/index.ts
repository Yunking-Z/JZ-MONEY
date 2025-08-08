import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mysql, { Connection } from 'mysql2/promise';

// 加载环境变量
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// 创建Express应用
const app: Express = express();
const PORT = process.env.PORT || 3001;

// 配置中间件
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置数据库连接
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

// 测试数据库连接并创建数据库
async function initDatabase() {
  try {
    // 先连接到MySQL服务器（不指定数据库）
    const connection = await mysql.createConnection(dbConfig);
    console.log('成功连接到MySQL服务器');

    // 创建数据库（如果不存在）
    const dbName = process.env.DB_NAME || 'jz_money';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`数据库 ${dbName} 已创建或已存在`);

    // 关闭连接
    await connection.end();

    // 重新连接到指定数据库
    const dbConnection = await mysql.createConnection({
      ...dbConfig,
      database: dbName
    });
    console.log(`成功连接到数据库 ${dbName}`);
    await dbConnection.end();
  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
}

initDatabase();

// 基本路由
app.get('/', (req: Request, res: Response) => {
  res.send('JZ-MONEY API 服务正在运行中');
});

// 注册API路由
import { registerRoutes } from './routes';
registerRoutes(app);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

export default app;