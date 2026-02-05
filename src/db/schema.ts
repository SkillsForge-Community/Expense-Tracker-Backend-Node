import { mysqlTable, serial, text, varchar, decimal, int, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';
import { TransactionCategoryValues, TransactionTypeValues } from '../transactions/transactions.types';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  userType: varchar('user_type', { length: 20 }), // ADMIN or USER
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  passwordHash: text('password_hash'),
});

export const transactions = mysqlTable('transactions', {
  id: serial('id').primaryKey(),
  description: text('description'),
  category: mysqlEnum('category', TransactionCategoryValues as [string, ...string[]]), // INCOME or EXPENSE
  type: mysqlEnum('type', TransactionTypeValues as [string, ...string[]]),
  createdOn: timestamp('created_on').defaultNow(),
  lastModifiedOn: timestamp('last_modified_on').defaultNow(),
  amount: decimal('amount', { precision: 15, scale: 3, mode: 'number' }),
  currency: varchar('currency', { length: 10 }), // NGN, USD, etc.
});
