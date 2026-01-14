import { test as base } from '@playwright/test';
import { initDB, query, begin, rollback, closeDB } from '@db';

export const test = base.extend<{
  db: { query: typeof query };
}>({
  db: async ({ }, use) => {
    await initDB();
    await begin();

    await use({ query });

    await rollback();
  }
});

export const expect = test.expect;

// Close DB once per worker
test.afterAll(async () => {
  await closeDB();
});

// This is old dbFixtures.ts content kept for reference
// import { test as base } from '@playwright/test';
// import { PostgresClient } from '../clients/postgresClient';

// export const test = base.extend<{ db: PostgresClient }>({
//   db: async ({}, use) => {
//     const db = new PostgresClient();
//     await db.connect();
//     await db.begin();
//     await use(db);
//     await db.rollback();
//     await db.close();
//   }
// });
