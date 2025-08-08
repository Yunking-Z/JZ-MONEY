import { Router } from 'express';
import { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../controllers/transactionController';

const router = Router();

// 创建新交易
router.post('/', createTransaction);

// 获取交易记录列表
router.get('/', getTransactions);

// 获取特定交易详情
router.get('/:id', getTransactionById);

// 更新交易信息
router.put('/:id', updateTransaction);

// 删除交易记录
router.delete('/:id', deleteTransaction);

export default router;