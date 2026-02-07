import { mysqlTable, serial, text, varchar, decimal, mysqlEnum, timestamp, bigint } from 'drizzle-orm/mysql-core';
import { TransactionType, TransactionCategory, currency, UserType } from 'src/transactions/transactions.types';
import { sql } from 'drizzle-orm';

//users table
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  userType: mysqlEnum('user_type', UserType).notNull().default(UserType.USER), // ADMIN or USER sert to user by default
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  passwordHash: text('password_hash'),
});

//transactions table
export const transactions = mysqlTable('transactions', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true })
            .notNull()
            .references(() => users.id),
  description: text('description'),
  category: mysqlEnum('category', TransactionCategory).notNull(),
  type: mysqlEnum('type', TransactionType).notNull(),
  createdAt: timestamp('created_at')
             .default(sql`CURRENT_TIMESTAMP`)
             .notNull(),
  updatedAt: timestamp('updated_at')
              .default(sql`CURRENT_TIMESTAMP`)
              .notNull()
              .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  amount: decimal('amount', { precision: 15, scale: 3, mode: 'number' }),
  currency: mysqlEnum('currency', currency).notNull(), // NGN, USD, etc.
});
