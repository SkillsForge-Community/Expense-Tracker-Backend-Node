import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import {
  RecurrenceFrequency,
  RecurrenceStatus,
  TransactionCategory,
  TransactionType,
  currency,
} from 'src/transactions/transactions.types';

export class CreateRecurringTransactionDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(TransactionCategory)
  category!: TransactionCategory;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsNotEmpty()
  @IsEnum(currency)
  currency!: currency;

  @IsNotEmpty()
  @IsEnum(RecurrenceFrequency)
  frequency!: RecurrenceFrequency;

  @IsOptional()
  @IsInt()
  @Min(1)
  intervalCount?: number;

  @IsNotEmpty()
  @IsDateString()
  startAt!: string;

  @IsOptional()
  @IsDateString()
  nextRunAt?: string;

  @IsOptional()
  @IsDateString()
  endAt?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsEnum(RecurrenceStatus)
  status?: RecurrenceStatus;
}
