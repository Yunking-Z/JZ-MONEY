# JZ-MONEY: AI自动记账应用

## 项目概述
JZ-MONEY是一款基于AI技术的自动记账应用，旨在帮助用户更轻松、更智能地管理个人财务。

## 技术架构
- **前端**: React + TypeScript
- **后端**: Node.js + Express + TypeScript
- **AI服务**: Node.js + Express + OpenAI API
- **数据库**: PostgreSQL
- **容器化**: Docker

## 项目结构
```
JZ-MONEY/
├── frontend/          # 前端应用
├── backend/           # 后端服务
├── ai-service/        # AI服务
├── docs/              # 文档资料
├── docker-compose.yml # Docker配置文件
└── README.md          # 项目说明
```

## 开发环境搭建
1. 确保安装了Node.js、npm和Docker
2. 克隆项目到本地
3. 进入项目目录
4. 启动Docker容器
   ```
   docker-compose up --build
   ```

## 服务访问
- 前端应用: http://localhost:3000
- 后端API: http://localhost:3001
- AI服务API: http://localhost:3002

## 环境变量配置
各服务的环境变量配置位于对应目录下的.env文件中，请在启动服务前配置好必要的环境变量。

## 贡献指南
欢迎贡献代码，提交问题和功能请求。请先阅读贡献指南。

## 许可证
本项目采用MIT许可证。