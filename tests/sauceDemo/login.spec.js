const { test, expect } = require('@playwright/test');

const LOGIN_URL = 'https://www.saucedemo.com/';
const INVALID_CREDENTIALS_ERROR =
  'Epic sadface: Username and password do not match any user in this service';

const users = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalidUsername: {
    username: 'invalid_user',
    password: 'secret_sauce',
  },
  invalidPassword: {
    username: 'standard_user',
    password: 'invalid_password',
  },
};

const selectors = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  pageTitle: '[data-test="title"]',
};

async function login(page, username, password) {
  if (username) {
    await page.locator(selectors.usernameInput).fill(username);
  }

  if (password) {
    await page.locator(selectors.passwordInput).fill(password);
  }

  await page.locator(selectors.loginButton).click();
}

test.describe('SauceDemo login functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('logs in with valid credentials', async ({ page }) => {
    await login(page, users.valid.username, users.valid.password);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(selectors.pageTitle)).toHaveText('Products');
  });

  test('shows an error for invalid username', async ({ page }) => {
    await login(page, users.invalidUsername.username, users.invalidUsername.password);

    await expect(page.locator(selectors.errorMessage)).toHaveText(
      INVALID_CREDENTIALS_ERROR
    );
  });

  test('shows an error for invalid password', async ({ page }) => {
    await login(page, users.invalidPassword.username, users.invalidPassword.password);

    await expect(page.locator(selectors.errorMessage)).toHaveText(
      INVALID_CREDENTIALS_ERROR
    );
  });

  test('shows an error when username and password are empty', async ({ page }) => {
    await login(page, '', '');

    await expect(page.locator(selectors.errorMessage)).toContainText(
      'Username is required'
    );
  });

  test('shows an error when username is empty', async ({ page }) => {
    await login(page, '', users.valid.password);

    await expect(page.locator(selectors.errorMessage)).toContainText(
      'Username is required'
    );
  });

  test('shows an error when password is empty', async ({ page }) => {
    await login(page, users.valid.username, '');

    await expect(page.locator(selectors.errorMessage)).toContainText(
      'Password is required'
    );
  });
});
