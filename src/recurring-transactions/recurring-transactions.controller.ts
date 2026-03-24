import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { RecurringTransactionsService } from './recurring-transactions.service';

@Controller('recurring-transactions')
@UseGuards(JwtAuthGuard)
export class RecurringTransactionsController {
  constructor(private readonly recurringTransactionsService: RecurringTransactionsService) {}

  @Post()
  createRecurringTransaction(@Body() dto: CreateRecurringTransactionDto, @Request() req: AuthenticatedRequest) {
    return this.recurringTransactionsService.createRecurringTransaction(dto, req.user.id);
  }

  @Get()
  getRecurringTransactionsForUser(@Request() req: AuthenticatedRequest) {
    return this.recurringTransactionsService.getRecurringTransactionsForUser(req.user.id);
  }

  @Get(':id')
  getRecurringTransactionById(@Param('id', ParseIntPipe) id: number, @Request() req: AuthenticatedRequest) {
    return this.recurringTransactionsService.getRecurringTransactionById(id, req.user.id);
  }

  @Put(':id')
  updateRecurringTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecurringTransactionDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.recurringTransactionsService.updateRecurringTransaction(id, dto, req.user.id);
  }

  @Delete(':id')
  deleteRecurringTransaction(@Param('id', ParseIntPipe) id: number, @Request() req: AuthenticatedRequest) {
    return this.recurringTransactionsService.deleteRecurringTransaction(id, req.user.id);
  }
}
