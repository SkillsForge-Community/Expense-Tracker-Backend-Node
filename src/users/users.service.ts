import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/users-dto';
import { UserType } from '../transactions/transactions.types';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
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