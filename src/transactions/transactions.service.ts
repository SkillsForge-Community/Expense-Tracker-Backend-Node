// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TransactionsService {}
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  createTransaction(dto: CreateTransactionDto, userId: number) {
    return this.transactionsRepo.create({ ...dto, userId });
  }
  

  getAllTransactions() {
    return this.transactionsRepo.findAll();
  }



  async getTransactionById(id: number, userId: number) {
    const transaction = await this.transactionsRepo.findOneByIdAndUserId(id, userId);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }


  async updateTransaction(id: number, dto: UpdateTransactionDto, userId: number) {
    const transaction = await this.transactionsRepo.findOneByIdAndUserId(id, userId);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return this.transactionsRepo.update(id, dto);
  }


    async deleteTransaction(id: number, userId: number) {
    const transaction = await this.transactionsRepo.findOneByIdAndUserId(id, userId);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return this.transactionsRepo.delete(id);
  }
}
