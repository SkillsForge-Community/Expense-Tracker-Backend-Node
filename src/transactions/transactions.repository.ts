import { Injectable, Inject } from '@nestjs/common';
import { db } from '../db/db';
import { transactions } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { InferInsertModel } from 'drizzle-orm';
import { returnFirst } from 'src/utils/return-first';

type CreateTransactionInput = InferInsertModel<typeof transactions>;
type UpdateTransactionInput = Partial<Omit<
          CreateTransactionInput, 
          'userId' | 'id' | 'createdOn' | 'lastModifiedOn'>
        >;


        
@Injectable()
export class TransactionsRepository {
  constructor(@Inject('DB') private readonly dbClient: typeof db) {}
  

  async create(tx: CreateTransactionInput) {
    return this.dbClient
      .insert(transactions)
      .values(tx);
  }


  async findAll() {
    return this.dbClient
      .select()
      .from(transactions);
  }


  async findOneByIdAndUserId(id: number, userId: number) {
    const rows = await this.dbClient
      .select()
      .from(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
      .limit(1);

    return returnFirst(rows);
  }


  async update(id: number, tx: UpdateTransactionInput) {
    return this.dbClient
      .update(transactions)
      .set(tx)
      .where(eq(transactions.id, id));
  }


    async delete(id: number) {
    return this.dbClient
      .delete(transactions)
      .where(eq(transactions.id, id));
  }
}
