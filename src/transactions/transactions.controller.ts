import { Controller, Get, Param, Put, Delete, Body, Post, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { RolesGuard } from 'src/users/roles.guard';
import { Roles } from 'src/users/roles.decorator';
import { UserType } from './transactions.types';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    
    // CREATE transaction
    @Post()
    createTransaction(@Body() createTransactionDto: CreateTransactionDto, @Request() req: AuthenticatedRequest) {
        const userId = req.user.id;
        return this.transactionsService.createTransaction(createTransactionDto, userId);
    }


    @Get()
    @UseGuards(RolesGuard)
    @Roles(UserType.ADMIN)
    getAllTransactions() {
        return this.transactionsService.getAllTransactions();
    }

    // GET transaction by id
    @Get(':id')
    getTransactionById(@Param('id', ParseIntPipe) id: number, @Request() req: AuthenticatedRequest) {
        const userId = req.user.id;
        return this.transactionsService.getTransactionById(id, userId);
    }

    // UPDATE transaction by id
    @Put(':id')
    updateTransaction(@Param('id',ParseIntPipe) id: number,
                     @Body() updateTransactionDto: UpdateTransactionDto,
                     @Request() req: AuthenticatedRequest) {
        const userId = req.user.id;
        return this.transactionsService.updateTransaction(id, updateTransactionDto, userId);
    }

    // DELETE transaction by id
    @Delete(':id')
    deleteTransaction(@Param('id',ParseIntPipe) id: number, @Request() req: AuthenticatedRequest){
        const userId = req.user.id;
        return this.transactionsService.deleteTransaction(id, userId);
    } 
}
