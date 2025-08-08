import { Router } from 'express';
import { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } from '../controllers/accountController';

const router = Router();

// 创建新账户
router.post('/', createAccount);

// 获取账户列表
router.get('/', getAccounts);

// 获取特定账户详情
router.get('/:id', getAccountById);

// 更新账户信息
router.put('/:id', updateAccount);

// 删除账户
router.delete('/:id', deleteAccount);

export default router;