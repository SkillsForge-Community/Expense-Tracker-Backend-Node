import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';


@Module({
  providers: [UsersService, UsersRepository],
  imports: [DbModule],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
