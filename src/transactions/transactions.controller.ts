import { Controller, Get, Param, Put, Delete, Body, Post, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/dto/update-transaction.dto';
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}
    @Post()
    createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.createTransaction(createTransactionDto);
    }

    @Get()
    getAllTransactions() {
        return this.transactionsService.getAllTransactions();
    }
    @Get(':id')
    getTransactionById(@Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.getTransactionById(id);
    }
    @Put(':id')
    updateTransaction(@Param('id',ParseIntPipe) id: number,
                     @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionsService.updateTransaction(id, updateTransactionDto);
    }
    @Delete(':id')
    deleteTransaction(@Param('id',ParseIntPipe) id: number){
        return this.transactionsService.deleteTransaction(id);
    } 
}
