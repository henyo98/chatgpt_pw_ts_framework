import { Client } from 'pg';
import { env } from '@core/env';

export class PostgresClient {
  private client = new Client({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD
  });

  async connect() { await this.client.connect(); }
  async begin() { await this.client.query('BEGIN'); }
  async rollback() { await this.client.query('ROLLBACK'); }
  async close() { await this.client.end(); }
  async query(sql: string, params?: any[]) {
    return this.client.query(sql, params);
  }
}