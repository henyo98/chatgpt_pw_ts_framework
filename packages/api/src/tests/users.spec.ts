import { test, expect } from '../../../../inwork/Authentication files newer/apiFixtures';

test('@smoke get users list', async ({ usersApi }) => {
  const users = await usersApi.getUsers();
  expect(users.length).toBeGreaterThan(0);
});