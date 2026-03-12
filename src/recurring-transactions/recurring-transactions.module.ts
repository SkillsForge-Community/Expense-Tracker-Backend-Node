import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { RecurringTransactionsRepository } from './recurring-transactions.repository';
import { RecurringTransactionsService } from './recurring-transactions.service';

@Module({
  imports: [DbModule],
  controllers: [RecurringTransactionsController],
  providers: [RecurringTransactionsService, RecurringTransactionsRepository],
})
export class RecurringTransactionsModule {}
