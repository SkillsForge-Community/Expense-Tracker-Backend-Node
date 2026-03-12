import { Inject, Injectable } from '@nestjs/common';
import { and, eq, InferInsertModel } from 'drizzle-orm';
import { db } from 'src/db/db';
import { recurringTransactions } from 'src/db/schema';
import { returnFirst } from 'src/utils/return-first';

type CreateRecurringTransactionInput = InferInsertModel<typeof recurringTransactions>;
type UpdateRecurringTransactionInput = Partial<
  Omit<CreateRecurringTransactionInput, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
>;

@Injectable()
export class RecurringTransactionsRepository {
  constructor(@Inject('DB') private readonly dbClient: typeof db) {}

  async create(recurringTransaction: CreateRecurringTransactionInput) {
    return this.dbClient.insert(recurringTransactions).values(recurringTransaction);
  }

  async findAllByUserId(userId: number) {
    return this.dbClient
      .select()
      .from(recurringTransactions)
      .where(eq(recurringTransactions.userId, userId));
  }

  async findOneByIdAndUserId(id: number, userId: number) {
    const rows = await this.dbClient
      .select()
      .from(recurringTransactions)
      .where(and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, userId)))
      .limit(1);

    return returnFirst(rows);
  }

  async updateByIdAndUserId(id: number, userId: number, recurringTransaction: UpdateRecurringTransactionInput) {
    return this.dbClient
      .update(recurringTransactions)
      .set(recurringTransaction)
      .where(and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, userId)));
  }

  async deleteByIdAndUserId(id: number, userId: number) {
    return this.dbClient
      .delete(recurringTransactions)
      .where(and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, userId)));
  }
}
