// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TransactionsService {}
import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from '../common/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../common/dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  createTransaction(dto: CreateTransactionDto) {
    return this.transactionsRepo.create(dto);
  }

  getAllTransactions() {
    return this.transactionsRepo.findAll();
  }

  getTransactionById(id: number) {
    return this.transactionsRepo.findById(id);
  }
  updateTransaction(id: number, dto: UpdateTransactionDto) {
    return this.transactionsRepo.update(id, dto);
  }
    deleteTransaction(id: number) {
    return this.transactionsRepo.delete(id);
  }
}
