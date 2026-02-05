import { TransactionCategory,TransactionType,currency } from "src/transactions/transactions.types";  
import {IsEnum,IsNotEmpty,IsNumber,IsPositive,IsString,Length} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  description!: string;
  
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


  @IsString()
  @IsNotEmpty()
  @IsEnum(currency)
  @Length(3, 3)
  currency!: currency;
}


