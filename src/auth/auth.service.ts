import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { env } from 'src/config/env';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  
  async login(loginDto: LoginDto) {
    

    const user = await this.usersRepository.findByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    //check pass
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash
    );
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
    };
    
    const token = jwt.sign(payload, env.JWT_SECRET || 'brjhjhjhghghghgkgkgkgk', {
      expiresIn: '24h',
    });
    
    // 4. Return token and user info
    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    };
  }
}
