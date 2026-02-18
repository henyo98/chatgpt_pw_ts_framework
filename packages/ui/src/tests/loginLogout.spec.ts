import {test} from '@ui/fixtures/ui.fixtures'
import { expect } from '@playwright/test';
import { AUTHENTICATED_ROLES } from '@core/constants/domain'
import { env } from '@core/env';

AUTHENTICATED_ROLES.forEach((ROLE) => {
    test(`Login for role: ${ROLE}`, async ({ uiPageUnauthenticated }) => {
        const page = uiPageUnauthenticated
        await page.goto(env.BASE_URL);
        await expect(page.locator("css=input[class^='SearchZbor']")).toBeVisible();
    });
});
