/* DATA TYPES */
export interface Transactions {
  id?: number;
  user_id?: number;
  transaction_type: string;
  amount: number;
  category: string;
  date: Date;
  timezone: string;
}

export interface GroupedTransaction {
  headDay?: string;
  headLine: string;
  data: Transactions[];
}

export interface SearchedTransaction {
  headLine: string;
  data: Transactions[];
}

export interface IncomeOutcomeResult {
  incomeSum: number;
  expenseSum: number;
}

export interface UserCredentials {
  userId?: number;
}

export interface CalendarButtonProps {
  value?: string;
  onClick: () => void;
  [key: string]: any;
}

export interface IconTitle {
  trendingUpTitle: string;
  trendingDownTitle: string;
  userId: number;
}
