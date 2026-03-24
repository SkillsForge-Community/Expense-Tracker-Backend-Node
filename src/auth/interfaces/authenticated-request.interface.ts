import type { Request } from 'express';
import type { UserType } from 'src/transactions/transactions.types';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    userType: UserType;
  };
}
