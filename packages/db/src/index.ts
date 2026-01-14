import { env } from '@core/env';
import { PostgresClient } from '@db/clients/postgresClient';
import { MySQLClient } from '@db/clients/mysqlClient';
import { seedOnce } from '@db/seed/seedOnce';

type DBClient = {
  connect(): Promise<void>;
  query(sql: string, params?: any[]): Promise<any>;
  begin(): Promise<void>;
  rollback(): Promise<void>;
  close(): Promise<void>;
};

let db: DBClient | null = null;
let initialized = false;

/**
 * Initialize DB once per worker
 */
export async function initDB() {
  if (initialized) return;

  if (env.DB_TYPE === 'postgres') {
    db = new PostgresClient();
  } else if (env.DB_TYPE === 'mysql') {
    db = new MySQLClient();
  } else {
    throw new Error(`Unsupported DB_TYPE: ${env.DB_TYPE}`);
  }

  await db.connect();

  // Optional seeding (once per worker)
  if (process.env.SEED_ON_START === 'true') {
    await seedOnce(db);
  }

  initialized = true;
}

/**
 * Unified query API
 */
export async function query(sql: string, params: any[] = []) {
  if (!db) {
    throw new Error('DB not initialized. Call initDB() first.');
  }
  return db.query(sql, params);
}

/**
 * Transaction helpers
 */
export async function begin() {
  if (!db) throw new Error('DB not initialized');
  await db.begin();
}

export async function rollback() {
  if (!db) throw new Error('DB not initialized');
  await db.rollback();
}

/**
 * Graceful shutdown
 */
export async function closeDB() {
  if (!db) return;
  await db.close();
  db = null;
  initialized = false;
}