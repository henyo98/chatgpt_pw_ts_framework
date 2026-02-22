import { test } from '@ui/fixtures/ui.fixtures'
import { expect } from '@playwright/test';
import { AUTHENTICATED_ROLES } from '@core/constants/domain'
import { env } from '@core/env';
import { header, loginForm } from '@ui/pages/header.selectors';
import { loginAsRole } from '@ui/actions/login.actions';
import { users } from '@core/config/users.config';

AUTHENTICATED_ROLES.forEach((ROLE) => {
    test(`Login for role: ${ROLE}`, async ({ uiPageUnauthenticated }) => {
        const page = uiPageUnauthenticated
        await page.goto(env.BASE_URL);
        await loginAsRole(page, ROLE)
    });
});
