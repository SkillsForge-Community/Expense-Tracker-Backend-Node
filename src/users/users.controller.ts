import { Controller, Get, Param, Body, Post, ParseIntPipe, Query, ForbiddenException, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    const isAdmin = req.user.userType === 'ADMIN';
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can access this resource');
    }
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const isAdmin = req.user.userType === 'ADMIN';
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can access this resource');
    }
      return this.usersService.findById(id);
  }
}
