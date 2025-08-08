// 账户类型定义

export interface Account {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'credit_card' | 'investment' | 'other';
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountCreateData {
  name: string;
  type: 'cash' | 'bank' | 'credit_card' | 'investment' | 'other';
  balance: number;
  currency: string;
}

export interface AccountUpdateData extends Partial<AccountCreateData> {
  id: string;
}

export interface AccountResponse {
  success: boolean;
  data: Account | Account[];
  message?: string;
}