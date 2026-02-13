import { expect } from '@playwright/test';
import { test } from '../../../../inwork/Authentication files newer/apiFixtures';
import { ROLES } from '@core/constants/domain';


ROLES.forEach((ROLE) => {
  test(`get zborovi list for user: ${ROLE}`, async ({ api, getAuthenticatedApi }) => {
    const zborovi = ROLE === "guest" ? await api.zborovi.getZborovi() : await (await getAuthenticatedApi(ROLE)).zborovi.getZborovi();
    expect(zborovi.zborovi.data.length).toBeGreaterThan(0);
  });
});

// // Both in same test
// test('compare auth vs no-auth responses', async ({ api, authenticatedApi }) => {
//   const publicZ = await api.zborovi.getZborovi();
//   const authZ = await authenticatedApi.zborovi.getZborovi();

//   expect(publicZ.data).toBeDefined();
//   expect(authZ.data).toBeDefined();
// });