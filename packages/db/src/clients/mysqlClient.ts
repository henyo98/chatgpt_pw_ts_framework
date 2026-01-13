import mysql from 'mysql2/promise';
import { env } from '@core/env';

export class MySQLClient {
  private conn:any;
  async connect() {
    this.conn = await mysql.createConnection({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD
    });
  }
  async begin(){ await this.conn.beginTransaction(); }
  async rollback(){ await this.conn.rollback(); }
  async close(){ await this.conn.end(); }
  async query(sql:string, params?:any[]){ return this.conn.execute(sql, params); }
}