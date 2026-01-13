import { test as base } from '@playwright/test';
import { PostgresClient } from '../clients/postgresClient';

export const test = base.extend<{ db: PostgresClient }>({
  db: async ({}, use) => {
    const db = new PostgresClient();
    await db.connect();
    await db.begin();
    await use(db);
    await db.rollback();
    await db.close();
  }
});