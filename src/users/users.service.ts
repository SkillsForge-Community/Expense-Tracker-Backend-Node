import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UserResponseDto } from './dto/users-dto';
import { UserType } from '../transactions/transactions.types';
import * as bcrypt from 'bcrypt';

type UserRow = Awaited<ReturnType<UsersRepository['findById']>>[number];

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.passwordHash, 10);
    await this.usersRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });

    const createdUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (!createdUser) {
      throw new InternalServerErrorException('User could not be created');
    }

    return this.toUserResponseDto(createdUser);
  }


  async findAll() {
    const users = await this.usersRepository.findAll();
    return users.map((user) => this.toUserResponseDto(user));
  }

  
    async findById(id: number) {
    const [user] = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toUserResponseDto(user);
  }

  async isAdmin(id: number) {
    const [user] = await this.usersRepository.findById(id);
    return user?.userType === UserType.ADMIN;
  }

  private toUserResponseDto(user: UserRow): UserResponseDto {
    return {
      id: user.id,
      userType: user.userType,
      name: user.name,
      email: user.email,
    };
  }
}