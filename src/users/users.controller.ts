import { Controller, Get, Param, Body, Post, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserType } from 'src/transactions/transactions.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
