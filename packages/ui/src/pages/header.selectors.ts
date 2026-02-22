import type { Page } from "@playwright/test";

export const headermodule = (page: Page) => page.locator('header');
export const header = {
    logoLink: (page: Page) =>
        headermodule(page).locator("a").filter({ has: page.locator("img[src*='logo']") }),
    zborLogo: (page: Page) =>
        headermodule(page).locator("img[src*='logo-full.svg']"),
    zboradminLogo: (page: Page) =>
        headermodule(page).locator("img[src*='zbor-admin-logo.svg']"),
    superadminLogo: (page: Page) =>
        headermodule(page).locator("img[src*='super-admin-logo.svg']"),
    languageSwitcherButton: (page: Page) =>
        page.locator("[aria-label='Select language']"),
    languageLabel: (page: Page) =>
        page.locator("[class*='languageLabel']"),
    calendarIcon: (page: Page) =>
        page.locator("[src='/images/icon_calendar.svg']"),
    burgerButton: (page: Page) =>
        page.locator("[aria-label='Open menu']")
}
export const drawerModule = (page: Page) =>
    page.locator("[class*='Drawer-module'][class*='content']")
export const topMenu = {
    navLinkHome: (page: Page) =>
        drawerModule(page).locator("a[href='/']"),
    navLinkAboutUs: (page: Page) =>
        drawerModule(page).locator("a[href='/o-nama']"),
    navLinkTerms: (page: Page) =>
        drawerModule(page).locator("a[href='/uslovi-koriscenja']"),
    navLinkPrivacyPolicy: (page: Page) =>
        drawerModule(page).locator("a[href='/politika-privatnosti']"),
    registerButton: (page: Page) =>
        page.locator("button").getByText("Региструј се као корисник"), //TODO: FE to add some attributes, selector to be better
};

export const loginForm = {
    emailInput: (page: Page) =>
        page.locator("[type='email']"),
    passwordInput: (page: Page) =>
        page.locator("[type='password']"),
    passwordVisibilityIcon: (page: Page) =>
        page.locator("[src='/images/icon_eye.svg']"),
    submitButton: (page: Page) =>
        page.locator("button[type='submit']"),
    forgotPasswordLink: (page: Page) =>
        page.locator("[class*='forgotPasswordLink']"),
};