import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// 加载环境变量
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// 创建Express应用
const app: Express = express();
const PORT = process.env.PORT || 3002;

// 配置中间件
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 基本路由
app.get('/', (req, res) => {
  res.send('JZ-MONEY AI 服务正在运行中');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`AI服务器运行在 http://localhost:${PORT}`);
});

export default app;