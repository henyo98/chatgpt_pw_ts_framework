import { test, expect } from '@ui/fixtures/ui.fixtures'
import { ROLES } from '@core/constants/domain'
import { env } from '@core/env';

ROLES.forEach((ROLE) => {
    test(`Login for role: ${ROLE}`, async ({ uiPageUnauthenticated }) => {
        
        if (ROLE !== 'guest') {
            await uiPageUnauthenticated.goto(env.BASE_URL)
        }
    });
});
