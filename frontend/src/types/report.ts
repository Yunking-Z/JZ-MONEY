// 报表类型定义

export interface IncomeExpenseReport {
  labels: string[];
  datasets: [
    {
      label: '收入';
      data: number[];
      backgroundColor: 'rgba(75, 192, 192, 0.2)';
      borderColor: 'rgba(75, 192, 192, 1)';
      borderWidth: 1;
    },
    {
      label: '支出';
      data: number[];
      backgroundColor: 'rgba(255, 99, 132, 0.2)';
      borderColor: 'rgba(255, 99, 132, 1)';
      borderWidth: 1;
    }
  ];
}

export interface CategoryExpenseReport {
  labels: string[];
  datasets: [
    {
      label: '支出金额';
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: 1;
    }
  ];
}

export interface AccountBalanceReport {
  accounts: Array<{
    name: string;
    type: string;
    balance: number;
    currency: string;
  }>;
  totalBalance: number;
}

export interface ReportResponse {
  success: boolean;
  data: IncomeExpenseReport | CategoryExpenseReport | AccountBalanceReport;
  message?: string;
}