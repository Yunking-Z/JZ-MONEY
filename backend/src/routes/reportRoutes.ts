import { Router } from 'express';
import { getIncomeExpenseReport, getCategoryExpenseReport, getAccountBalanceReport } from '../controllers/reportController';

const router = Router();

// 获取收入支出报表
router.get('/income-expense', getIncomeExpenseReport);

// 获取分类支出报表
router.get('/category-expense', getCategoryExpenseReport);

// 获取账户余额报表
router.get('/account-balance', getAccountBalanceReport);

export default router;