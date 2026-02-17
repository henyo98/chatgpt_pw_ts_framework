import { expect } from '@playwright/test';
import { test } from '@api/fixtures/api.fixtures';
import { ROLES } from '@core/constants/domain';

ROLES.forEach((ROLE) => {
  test(`get zborovi list for user: ${ROLE}`, async ({ api, getAuthenticatedApi }) => {
    const zborovi = ROLE === "guest" ? await api.zborovi.getZborovi() : await (await getAuthenticatedApi(ROLE)).zborovi.getZborovi();
    expect(zborovi.zborovi.data.length).toBeGreaterThan(0);
  });
});