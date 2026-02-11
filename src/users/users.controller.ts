import { Controller, Get, Param, Body, Post, ParseIntPipe, Query, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users-dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('adminId', ParseIntPipe) adminId: number) {
    const isAdmin = await this.usersService.isAdmin(adminId);
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can access this resource');
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Query('adminId', ParseIntPipe) adminId: number, @Param('id', ParseIntPipe) id: number) {
    const isAdmin = await this.usersService.isAdmin(adminId);
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can access this resource');
    }
      return this.usersService.findById(id);
  }
}
