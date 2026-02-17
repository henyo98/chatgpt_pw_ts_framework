import { test, expect } from '@ui/fixtures/hybrid.fixtures';

test('API creates data, UI verifies it', async ({ api, uiPage }) => {
    const word = await api.zborovi.createWord('HybridPattern');

    await uiPage.goto('/words');
    await expect(uiPage.getByText(word.name)).toBeVisible();
});
