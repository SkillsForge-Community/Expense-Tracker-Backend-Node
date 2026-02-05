import { TransactionCategory,TransactionType } from "src/transactions/transactions.types";  
export class CreateTransactionDto {
  description!: string;
  category!: TransactionCategory;
  type!: TransactionType;
  amount!: number;
  currency!: string;
}
