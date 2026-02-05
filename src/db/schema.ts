import { mysqlTable, serial, text, varchar, decimal, mysqlEnum, int, timestamp, bigint } from 'drizzle-orm/mysql-core';
import { TransactionType, TransactionCategory, currency, UserType } from 'src/transactions/transactions.types';

//users table
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  userType: mysqlEnum('user_type', UserType as unknown as [string, ...string[]]).notNull().default('USER'), // ADMIN or USER sert to user by default
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  passwordHash: text('password_hash'),
});

//transactions table
export const transactions = mysqlTable('transactions', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).notNull().references(() => users.id),
  description: text('description'),
  category: mysqlEnum('category', TransactionCategory as unknown as [string, ...string[]]).notNull(),
  type: mysqlEnum('type', TransactionType as unknown as [string, ...string[]]),
  createdOn: timestamp('created_on').defaultNow(),
  lastModifiedOn: timestamp('last_modified_on').defaultNow(),
  amount: decimal('amount', { precision: 15, scale: 3, mode: 'number' }),
  currency: mysqlEnum('currency', currency as unknown as [string, ...string[]]).notNull(), // NGN, USD, etc.
});
