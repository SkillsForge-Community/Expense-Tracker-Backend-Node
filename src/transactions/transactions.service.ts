// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TransactionsService {}
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
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
    const [transaction] = await this.transactionsRepo.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    if (transaction.userId !== userId) {
      throw new ForbiddenException('You can only access your own transactions');
    }
    return transaction;
  }


  async updateTransaction(id: number, dto: UpdateTransactionDto, userId: number) {
    const [transaction] = await this.transactionsRepo.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    if (transaction.userId !== userId) {
      throw new ForbiddenException('You can only update your own transactions');
    }
    return this.transactionsRepo.update(id, dto);
  }


    async deleteTransaction(id: number, userId: number) {
    const [transaction] = await this.transactionsRepo.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    if (transaction.userId !== userId) {
      throw new ForbiddenException('You can only delete your own transactions');
    }
    return this.transactionsRepo.delete(id);
  }
}
