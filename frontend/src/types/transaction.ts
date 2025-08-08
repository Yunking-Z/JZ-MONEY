// 交易记录类型定义

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionCreateData {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  accountId: string;
}

export interface TransactionUpdateData extends Partial<TransactionCreateData> {
  id: string;
}

export interface TransactionResponse {
  success: boolean;
  data: Transaction | Transaction[];
  message?: string;
}