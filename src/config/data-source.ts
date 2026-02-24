import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: process.env.DATABASE_PATH || join(process.cwd(), 'data', 'trilha.db'),
  entities: [join(__dirname, '..', '**', '*.entity.js')],
  migrations: [join(__dirname, '..', 'migrations', '*.js')],
  synchronize: false,
});
