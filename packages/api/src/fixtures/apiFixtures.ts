import { test as base, request } from '@playwright/test';
import { UsersAPI } from '../clients/usersApi';

export const test = base.extend<{ usersApi: UsersAPI }>({
  usersApi: async ({}, use) => {
    const api = await request.newContext();
    const client = new UsersAPI(api);
    await use(client);
    await api.dispose();
  }
});