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
  headDay: string;
  headDate: string;
  data: Transactions[];
}

export interface IncomeOutcomeResult {
  incomeSum: number;
  expenseSum: number;
}
