const { test, expect } = require('@playwright/test');

const LOGIN_URL = 'https://www.saucedemo.com/';
const ABOUT_URL = 'https://saucelabs.com/';

const user = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const selectors = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  pageTitle: '[data-test="title"]',
  menuButton: '#react-burger-menu-btn',
  menuWrap: '.bm-menu-wrap',
  allItemsLink: '[data-test="inventory-sidebar-link"]',
  aboutLink: '[data-test="about-sidebar-link"]',
  logoutLink: '[data-test="logout-sidebar-link"]',
  resetAppStateLink: '[data-test="reset-sidebar-link"]',
};

async function login(page) {
  await page.goto(LOGIN_URL);
  await page.locator(selectors.usernameInput).fill(user.username);
  await page.locator(selectors.passwordInput).fill(user.password);
  await page.locator(selectors.loginButton).click();
}

async function openMenu(page) {
  await page.locator(selectors.menuButton).click();
  await expect(page.locator(selectors.menuWrap)).toBeVisible();
  await expect(page.locator(selectors.allItemsLink)).toBeVisible();
  await expect(page.locator(selectors.aboutLink)).toBeVisible();
  await expect(page.locator(selectors.logoutLink)).toBeVisible();
  await expect(page.locator(selectors.resetAppStateLink)).toBeVisible();
}

test.describe('SauceDemo left navigation menu', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(selectors.pageTitle)).toHaveText('Products');
  });

  test('opens the hamburger menu and navigates to About', async ({ page }) => {
    await openMenu(page);
    await page.locator(selectors.aboutLink).click();

    await expect(page).toHaveURL(ABOUT_URL);
  });

  test('opens the hamburger menu and logs out', async ({ page }) => {
    await openMenu(page);
    await page.locator(selectors.logoutLink).click();

    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.locator(selectors.loginButton)).toBeVisible();
  });
});
