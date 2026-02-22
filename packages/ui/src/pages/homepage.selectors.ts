import type { Page } from "@playwright/test";

export const selectorsHomepage = {
    searchInput: (page: Page) => page.locator("css=input[class^='SearchZbor']")
};

