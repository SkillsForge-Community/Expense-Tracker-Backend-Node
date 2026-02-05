import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { TransactionCategory, TransactionType, currency} from '../../transactions/transactions.types';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  description?: string;


  @IsOptional()
  @IsEnum(TransactionCategory)
  category?: TransactionCategory;


  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;


  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;


  @IsOptional()
  @IsEnum(currency)
  currency?: currency;
}

