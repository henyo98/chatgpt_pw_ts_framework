import { query } from "@db";
import { test, expect } from '@db/fixtures/dbFixtures';

//this is test that uses query from index.ts via fixture
test('@smoke create and read user in db', async ({ db }) => {
    await query('SELECT * FROM users');
});
