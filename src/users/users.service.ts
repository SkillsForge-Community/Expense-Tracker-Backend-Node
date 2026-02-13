import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/users-dto';
import { UserType } from '../transactions/transactions.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.passwordHash, 10);
    return this.usersRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
  }


  async findAll() {
    return this.usersRepository.findAll();
  }

  
    async findById(id: number) {
    return this.usersRepository.findById(id);
  }

  async isAdmin(id: number) {
    const [user] = await this.usersRepository.findById(id);
    return user?.userType === UserType.ADMIN;
  }
}