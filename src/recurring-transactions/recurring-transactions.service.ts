import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RecurrenceStatus } from 'src/transactions/transactions.types';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { RecurringTransactionsRepository } from './recurring-transactions.repository';

@Injectable()
export class RecurringTransactionsService {
  constructor(private readonly recurringTransactionsRepository: RecurringTransactionsRepository) {}

  createRecurringTransaction(dto: CreateRecurringTransactionDto, userId: number) {
    const startAt = this.toDate(dto.startAt, 'startAt');
    const nextRunAt = dto.nextRunAt ? this.toDate(dto.nextRunAt, 'nextRunAt') : startAt;
    const endAt = dto.endAt ? this.toDate(dto.endAt, 'endAt') : undefined;

    this.validateSchedule(startAt, nextRunAt, endAt);

    return this.recurringTransactionsRepository.create({
      ...dto,
      userId,
      intervalCount: dto.intervalCount ?? 1,
      timezone: dto.timezone ?? 'UTC',
      status: dto.status ?? RecurrenceStatus.ACTIVE,
      startAt,
      nextRunAt,
      endAt,
    });
  }

  getRecurringTransactionsForUser(userId: number) {
    return this.recurringTransactionsRepository.findAllByUserId(userId);
  }

  async getRecurringTransactionById(id: number, userId: number) {
    const recurringTransaction = await this.recurringTransactionsRepository.findOneByIdAndUserId(id, userId);

    if (!recurringTransaction) {
      throw new NotFoundException('Recurring transaction not found');
    }

    return recurringTransaction;
  }

  async updateRecurringTransaction(id: number, dto: UpdateRecurringTransactionDto, userId: number) {
    const recurringTransaction = await this.recurringTransactionsRepository.findOneByIdAndUserId(id, userId);

    if (!recurringTransaction) {
      throw new NotFoundException('Recurring transaction not found');
    }

    const updatePayload: Record<string, unknown> = { ...dto };

    if (dto.startAt !== undefined) {
      updatePayload.startAt = this.toDate(dto.startAt, 'startAt');
    }

    if (dto.nextRunAt !== undefined) {
      updatePayload.nextRunAt = this.toDate(dto.nextRunAt, 'nextRunAt');
    }

    if (dto.endAt !== undefined) {
      updatePayload.endAt = this.toDate(dto.endAt, 'endAt');
    }

    const nextStartAt = (updatePayload.startAt as Date | undefined) ?? recurringTransaction.startAt;
    const nextNextRunAt = (updatePayload.nextRunAt as Date | undefined) ?? recurringTransaction.nextRunAt;
    const nextEndAt = (updatePayload.endAt as Date | undefined) ?? recurringTransaction.endAt;

    this.validateSchedule(nextStartAt, nextNextRunAt, nextEndAt ?? undefined);

    return this.recurringTransactionsRepository.updateByIdAndUserId(id, userId, updatePayload);
  }

  async deleteRecurringTransaction(id: number, userId: number) {
    const recurringTransaction = await this.recurringTransactionsRepository.findOneByIdAndUserId(id, userId);

    if (!recurringTransaction) {
      throw new NotFoundException('Recurring transaction not found');
    }

    return this.recurringTransactionsRepository.deleteByIdAndUserId(id, userId);
  }

  private toDate(value: string, fieldName: string): Date {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new BadRequestException(`${fieldName} must be a valid date-time value`);
    }

    return parsedDate;
  }

  private validateSchedule(startAt: Date, nextRunAt: Date, endAt?: Date) {
    if (nextRunAt.getTime() < startAt.getTime()) {
      throw new BadRequestException('nextRunAt cannot be earlier than startAt');
    }

    if (endAt && endAt.getTime() < startAt.getTime()) {
      throw new BadRequestException('endAt cannot be earlier than startAt');
    }
  }
}
