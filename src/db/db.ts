import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import {env} from '../config/env';

const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  port: Number(env.DB_PORT) || 3306,
});

export const db = drizzle(pool);
