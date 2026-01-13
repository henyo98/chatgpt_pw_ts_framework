import { test, expect } from '../fixtures/dbFixtures';

test('@smoke create and read user in db', async ({ db }) => {
  await db.query('INSERT INTO users(name,email) VALUES($1,$2)', ['Test','test@example.com']);
  const res = await db.query('SELECT * FROM users WHERE email=$1', ['test@example.com']);
  expect(res.rows.length).toBe(1);
});