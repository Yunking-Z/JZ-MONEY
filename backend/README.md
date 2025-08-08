# JZ-MONEY 后端API服务

## 项目概述
这是JZ-MONEY应用的后端API服务，提供用户认证、交易记录管理、账户管理和报表生成等功能。

## 技术栈
- Node.js
- Express
- TypeScript
- MySQL
- JWT认证

## 项目结构
```
backend/
├── src/
│   ├── config/
│   │   └── db.ts          # 数据库配置
│   ├── controllers/
│   │   ├── authController.ts        # 认证控制器
│   │   ├── transactionController.ts # 交易记录控制器
│   │   ├── accountController.ts     # 账户控制器
│   │   └── reportController.ts      # 报表控制器
│   ├── middleware/
│   │   └── auth.ts                  # 认证中间件
│   ├── routes/
│   │   ├── index.ts                 # 路由入口
│   │   ├── authRoutes.ts            # 认证路由
│   │   ├── transactionRoutes.ts     # 交易记录路由
│   │   ├── accountRoutes.ts         # 账户路由
│   │   └── reportRoutes.ts          # 报表路由
│   ├── types/
│   │   └── pg-error.d.ts
│   ├── utils/
│   └── index.ts                     # 应用入口
├── db-init.sql                      # 数据库初始化脚本
├── .env                             # 环境变量配置
├── package.json
├── tsconfig.json
└── README.md
```

## 环境配置
1. 确保已安装Node.js和MySQL
2. 创建`.env`文件，配置以下环境变量：
   ```
   # 环境配置
   NODE_ENV=development
   PORT=3001

   # 数据库配置
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=admin
   DB_PASSWORD=123456
   DB_NAME=jz_money_db

   # JWT配置
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   ```

## 数据库初始化
1. 启动MySQL服务
2. 执行数据库初始化脚本：
   ```
   mysql -u admin -p < db-init.sql
   ```
   输入密码：123456

## 安装依赖
```
cd backend
npm install
```

## 运行项目
### 开发模式
```
npm run dev
```

### 生产模式
1. 构建项目：
   ```
npm run build
   ```
2. 启动服务：
   ```
npm start
   ```

## API文档
### 认证API
- `POST /api/auth/register`：注册新用户
- `POST /api/auth/login`：用户登录
- `GET /api/auth/me`：获取当前用户信息

### 交易记录API
- `POST /api/transactions`：创建新交易
- `GET /api/transactions`：获取交易记录列表
- `GET /api/transactions/:id`：获取特定交易详情
- `PUT /api/transactions/:id`：更新交易信息
- `DELETE /api/transactions/:id`：删除交易记录

### 账户API
- `POST /api/accounts`：创建新账户
- `GET /api/accounts`：获取账户列表
- `GET /api/accounts/:id`：获取特定账户详情
- `PUT /api/accounts/:id`：更新账户信息
- `DELETE /api/accounts/:id`：删除账户

### 报表API
- `GET /api/reports/income-expense`：获取收入支出报表
- `GET /api/reports/category-expense`：获取分类支出报表
- `GET /api/reports/account-balance`：获取账户余额报表

## 测试
使用Postman或其他API测试工具测试各个端点。确保在测试需要认证的API时，在请求头中包含有效的JWT令牌。

## 注意事项
1. 确保在生产环境中使用安全的JWT_SECRET
2. 定期备份数据库
3. 在生产环境中关闭调试模式
4. 考虑使用HTTPS加密传输