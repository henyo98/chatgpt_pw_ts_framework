import { test as apiTest } from '@api/fixtures/api.fixtures';
import { test as uiTest } from '@ui/fixtures/ui.fixtures';

// Compose UI on top of API
export const test = apiTest.extend(uiTest);

export const expect = test.expect;
