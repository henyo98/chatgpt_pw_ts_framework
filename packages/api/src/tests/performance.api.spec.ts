import { test, expect } from '../fixtures/apiFixtures';

test('@smoke @perf users API responds fast', async ({ usersApi }) => {
  const start = Date.now();
  await usersApi.getUsers();
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(2000);
});