import { mysqlTable, serial, text, varchar, decimal, mysqlEnum, timestamp, bigint, int, index } from 'drizzle-orm/mysql-core';
import { TransactionType, TransactionCategory, currency, UserType, RecurrenceFrequency, RecurrenceStatus } from 'src/transactions/transactions.types';
import { sql } from 'drizzle-orm';

//users table
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),

  userType: mysqlEnum('user_type', UserType).notNull()
                                            .default(UserType.USER), // ADMIN or USER sert to user by default
  
  name: varchar('name', { length: 255 }).notNull(),

  email: varchar('email', { length: 255 }).unique()
                                          .notNull(),

  passwordHash: text('password_hash').notNull(),
});

export const recurringTransactions = mysqlTable('recurring_transactions', {
  id: serial('id').primaryKey(),

  userId: bigint('user_id', { mode: 'number', unsigned: true })
            .notNull()
            .references(() => users.id),

  description: text('description'),

  category: mysqlEnum('category', TransactionCategory).notNull(),

  type: mysqlEnum('type', TransactionType).notNull(),

  amount: decimal('amount', { precision: 15, scale: 3, mode: 'number' }).notNull(),

  currency: mysqlEnum('currency', currency).notNull(),

  frequency: mysqlEnum('frequency', RecurrenceFrequency).notNull(),

  intervalCount: int('interval_count', { unsigned: true }).notNull().default(1),

  startAt: timestamp('start_at').notNull(),

  nextRunAt: timestamp('next_run_at').notNull(),

  endAt: timestamp('end_at'),

  lastRunAt: timestamp('last_run_at'),

  timezone: varchar('timezone', { length: 64 }).notNull().default('UTC'),

  status: mysqlEnum('status', RecurrenceStatus)
            .notNull()
            .default(RecurrenceStatus.ACTIVE),

  createdAt: timestamp('created_at')
              .default(sql`CURRENT_TIMESTAMP`)
              .notNull(),

  updatedAt: timestamp('updated_at')
              .default(sql`CURRENT_TIMESTAMP`)
              .notNull()
              .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  userIdIdx: index('recurring_transactions_user_id_idx').on(table.userId),
  statusNextRunIdx: index('recurring_transactions_status_next_run_idx').on(table.status, table.nextRunAt),
}));

//transactions table
export const transactions = mysqlTable('transactions', {
  id: serial('id').primaryKey(),

  userId: bigint('user_id', { mode: 'number', unsigned: true })
            .notNull()
            .references(() => users.id),

  recurringTransactionId: bigint('recurring_transaction_id', { mode: 'number', unsigned: true })
                            .references(() => recurringTransactions.id),

  description: text('description'),

  category: mysqlEnum('category', TransactionCategory).notNull(),

  type: mysqlEnum('type', TransactionType).notNull(),

  transactionDate: timestamp('transaction_date')
                    .default(sql`CURRENT_TIMESTAMP`)
                    .notNull(),

  createdAt: timestamp('created_at')
             .default(sql`CURRENT_TIMESTAMP`)
             .notNull(),

  updatedAt: timestamp('updated_at')
              .default(sql`CURRENT_TIMESTAMP`)
              .notNull()
              .$onUpdate(() => sql`CURRENT_TIMESTAMP`),

  amount: decimal('amount', { precision: 15, scale: 3, mode: 'number' }),

  currency: mysqlEnum('currency', currency).notNull(), // NGN, USD, etc.

  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  userIdIdx: index('transactions_user_id_idx').on(table.userId),
  recurringTransactionIdIdx: index('transactions_recurring_transaction_id_idx').on(table.recurringTransactionId),
  userTransactionDateIdx: index('transactions_user_transaction_date_idx').on(table.userId, table.transactionDate),
}));
