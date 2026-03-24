import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { RecurringTransactionsModule } from './recurring-transactions/recurring-transactions.module';


@Module({
  imports: [UsersModule, TransactionsModule, AuthModule, RecurringTransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
