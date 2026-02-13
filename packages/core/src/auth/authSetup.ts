import { request } from '@playwright/test';

async function loginAndSaveState(
  baseURL: string,
  username: string,
  password: string,
  storagePath: string
) {
  const apiContext = await request.newContext({ baseURL });

  // 1. Get CSRF
  const csrfResponse = await apiContext.get('/api/auth/csrf');
  const { csrfToken } = await csrfResponse.json();

  // 2. Login
  await apiContext.post('/api/auth/callback/credentials', {
    form: {
      username,
      password,
      csrfToken,
    },
  });

  // 3. Save storage state
  await apiContext.storageState({ path: storagePath });

  await apiContext.dispose();
}

export default loginAndSaveState;