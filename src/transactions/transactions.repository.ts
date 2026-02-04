import { Injectable, Inject } from '@nestjs/common';
import { db } from '../db/db';
import { transactions } from '../db/schema';
import { eq } from 'drizzle-orm';
import { TransactionCategory, TransactionType} from './transactions.types';

interface CreateTransactionInput {
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  currency: string;
}

interface UpdateTransactionInput {
  description?: string;
  category?: TransactionCategory;
  type?: TransactionType;
  amount?: number;
  currency?: string;
}
@Injectable()
export class TransactionsRepository {
  constructor(@Inject('DB') private readonly dbClient: typeof db) {}

  async create(tx: CreateTransactionInput) {
    return this.dbClient.insert(transactions).values(tx);
  }

  async findAll() {
    return this.dbClient.select().from(transactions);
  }

  async findById(id: number) {
    return this.dbClient.select().from(transactions).where(eq(transactions.id, id));
  }
  async update(id: number, tx: UpdateTransactionInput) {
    return this.dbClient
      .update(transactions)
      .set({ ...tx, lastModifiedOn: new Date() })
      .where(eq(transactions.id, id));
  }
    async delete(id: number) {
    return this.dbClient.delete(transactions).where(eq(transactions.id, id));
  }
}
