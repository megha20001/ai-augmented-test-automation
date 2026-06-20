const { test, expect } = require('@playwright/test');

const LOGIN_URL = 'https://www.saucedemo.com/';

const user = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const selectors = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  pageTitle: '[data-test="title"]',
  inventoryItem: '[data-test="inventory-item"]',
  inventoryItemName: '[data-test="inventory-item-name"]',
  addToCartButton: 'button[data-test^="add-to-cart"]',
  removeButton: 'button[data-test^="remove"]',
  cartLink: '[data-test="shopping-cart-link"]',
  cartItem: '[data-test="inventory-item"]',
  cartItemName: '[data-test="inventory-item-name"]',
};

async function login(page) {
  await page.goto(LOGIN_URL);
  await page.locator(selectors.usernameInput).fill(user.username);
  await page.locator(selectors.passwordInput).fill(user.password);
  await page.locator(selectors.loginButton).click();
}

test.describe('SauceDemo cart functionality', () => {
  test('adds the first product to the cart', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(selectors.pageTitle)).toHaveText('Products');

    const firstProduct = page.locator(selectors.inventoryItem).first();
    const firstProductName = await firstProduct
      .locator(selectors.inventoryItemName)
      .textContent();
    const addToCartButton = firstProduct.locator(selectors.addToCartButton);

    await addToCartButton.click();
    await expect(firstProduct.locator(selectors.removeButton)).toHaveText('Remove');

    await page.locator(selectors.cartLink).click();

    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator(selectors.cartItem)).toBeVisible();
    await expect(page.locator(selectors.cartItemName)).toHaveText(firstProductName);
  });
});
