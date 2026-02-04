import { TransactionCategory,TransactionType } from 'src/transactions/transactions.types';
export class UpdateTransactionDto {
  description?: string;
  category?: TransactionCategory;
  type?: TransactionType;
  amount?: number;
  currency?: string;
}
