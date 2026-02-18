import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { RolesGuard } from './roles.guard';


@Module({
  providers: [UsersService, UsersRepository, RolesGuard],
  imports: [DbModule],
  controllers: [UsersController],
})
export class UsersModule {}
