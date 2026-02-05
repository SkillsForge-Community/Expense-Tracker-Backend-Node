export const TransactionTypeValues = ['INCOME', 'EXPENSE'] as const;
export type TransactionType = (typeof TransactionTypeValues)[number];

export const TransactionCategoryValues = [
  'HOUSING',
  'TRANSPORTATION',
  'FOOD',
  'UTILITIES',
  'CLOTHING',
  'HEALTHCARE',
  'INSURANCE',
  'PERSONAL',
  'DEBT',
  'SAVINGS',
  'EDUCATION',
  'ENTERTAINMENT',
  'MISCELLANEOUS',
  'SALARY',
  'BUSINESS',
  'GIFT',
  'INVESTMENT',
  'REFUND',
  'TAXES',
  'SUBSCRIPTIONS',
] as const;

export type TransactionCategory = (typeof TransactionCategoryValues)[number];
