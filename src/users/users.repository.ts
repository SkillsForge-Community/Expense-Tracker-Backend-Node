import { Injectable, Inject } from '@nestjs/common';
import { db } from '../db/db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { InferInsertModel } from 'drizzle-orm';

type CreateUserInput = InferInsertModel<typeof users>;


@Injectable()
export class UsersRepository {
  constructor(@Inject('DB') private readonly dbClient: typeof db) {}
    async create(user: CreateUserInput) {
    return this.dbClient
      .insert(users)
      .values(user);
  }

    //for admin use only
    async findAll() {
    return this.dbClient
      .select()
      .from(users);
  }

    //for admin use only
    async findById(id: number) {
    return this.dbClient.select()
      .from(users)
      .where(eq(users.id, id));
  }

}