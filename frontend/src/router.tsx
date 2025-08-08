import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 导入页面组件
import AssetOverview from './pages/AssetOverview';
import TransactionRecords from './pages/TransactionRecords';
import ExpenseAnalysis from './pages/ExpenseAnalysis';
import BudgetManagement from './pages/BudgetManagement';
import AIAssistant from './pages/AIAssistant';
import SmartBookkeeping from './pages/SmartBookkeeping';
import AddTransaction from './pages/AddTransaction';
import PersonalCenter from './pages/PersonalCenter';
import APITest from './pages/APITest';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AssetOverview />,
      },
      {
        path: '/transaction-records',
        element: <TransactionRecords />,
      },
      {
        path: '/expense-analysis',
        element: <ExpenseAnalysis />,
      },
      {
        path: '/budget-management',
        element: <BudgetManagement />,
      },
      {
        path: '/ai-assistant',
        element: <AIAssistant />,
      },
      {
        path: '/smart-bookkeeping',
        element: <SmartBookkeeping />,
      },
      {
        path: '/add-transaction',
        element: <AddTransaction />,
      },
      {
        path: '/personal-center',
        element: <PersonalCenter />,
      },
    ],
  },
]);

export default router;