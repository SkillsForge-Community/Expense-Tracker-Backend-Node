import { Controller, Get, Param, Put, Delete, Body, Post, ParseIntPipe, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    
    // CREATE transaction
    @Post()
    createTransaction(@Body() createTransactionDto: CreateTransactionDto, @Request() req: ExpressRequest) {
        const userId = (req as any).user.id; 
        return this.transactionsService.createTransaction(createTransactionDto, userId);
    }


    @Get()
    getAllTransactions(@Request() req: ExpressRequest) {
        const isAdmin = (req as any).user.userType === 'ADMIN';
        if (!isAdmin) {
            throw new ForbiddenException('Only admins can access all transactions');
        }
        return this.transactionsService.getAllTransactions();
    }

    // GET transaction by id
    @Get(':id')
    getTransactionById(@Param('id', ParseIntPipe) id: number, @Request() req: ExpressRequest) {
        const userId = (req as any).user.id;
        return this.transactionsService.getTransactionById(id, userId);
    }

    // UPDATE transaction by id
    @Put(':id')
    updateTransaction(@Param('id',ParseIntPipe) id: number,
                     @Body() updateTransactionDto: UpdateTransactionDto,
                     @Request() req: ExpressRequest) {
        const userId = (req as any).user.id;
        return this.transactionsService.updateTransaction(id, updateTransactionDto, userId);
    }

    // DELETE transaction by id
    @Delete(':id')
    deleteTransaction(@Param('id',ParseIntPipe) id: number, @Request() req: ExpressRequest){
        const userId = (req as any).user.id;
        return this.transactionsService.deleteTransaction(id, userId);
    } 
}
