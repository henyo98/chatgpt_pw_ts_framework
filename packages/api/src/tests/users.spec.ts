import { test, expect } from '../fixtures/apiFixtures';

test('@smoke get users list', async ({ usersApi }) => {
  const users = await usersApi.getUsers();
  expect(users.length).toBeGreaterThan(0);
});