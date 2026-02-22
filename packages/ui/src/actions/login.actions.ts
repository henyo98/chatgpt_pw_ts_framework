import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { header, loginForm } from '@ui/pages/header.selectors';
import { users } from '@core/config/users.config';
import type { Role } from '@core/constants/domain';
import { waitForLoadState } from '@ui/actions/helpers.ui'

export async function loginAsRole(page: Page, role: Role) {
    await header.burgerButton(page).click();
    await loginForm.emailInput(page).fill(users[role].username);
    await loginForm.passwordInput(page).fill(users[role].password);
    await loginForm.submitButton(page).click();
    await waitForLoadState(page);

    switch (role) {
        case 'user':
            await expect(header.zborLogo(page)).toBeVisible()
            break;
        case 'zboradmin':
            await expect(header.zboradminLogo(page)).toBeVisible()
            break;
        case 'superadmin':
            await expect(header.superadminLogo(page)).toBeVisible()
            break;
    }
}
