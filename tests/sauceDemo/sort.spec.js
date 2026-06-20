const { test, expect } = require('@playwright/test');
// test data
const LOGIN_URL = 'https://www.saucedemo.com/';

const user = {
  username: 'standard_user',
  password: 'secret_sauce',
};
// selectors
const selectors = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  pageTitle: '[data-test="title"]',
  sortDropdown: '[data-test="product-sort-container"]',
  inventoryItemName: '[data-test="inventory-item-name"]',
  inventoryItemPrice: '[data-test="inventory-item-price"]',
};

async function login(page) {
  await page.goto(LOGIN_URL);
  await page.locator(selectors.usernameInput).fill(user.username);
  await page.locator(selectors.passwordInput).fill(user.password);
  await page.locator(selectors.loginButton).click();
}

async function getProductNames(page) {
  return page.locator(selectors.inventoryItemName).allTextContents();
}

async function getProductPrices(page) {
  const prices = await page.locator(selectors.inventoryItemPrice).allTextContents();

  return prices.map((price) => Number(price.replace('$', ''))); // removes $ sign and converts strings to numbers for numeric sorting
}

test.describe('SauceDemo product sorting', () => { //Grouping all sorting tests together.
  test.beforeEach(async ({ page }) => { // This will run before each test in this describe block, ensuring we are logged in and on the inventory page before testing sorting.
    await login(page);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(selectors.pageTitle)).toHaveText('Products');
  });

  test('sorts products by name from A to Z', async ({ page }) => {
    await page.locator(selectors.sortDropdown).selectOption('az');

    const productNames = await getProductNames(page);
    const sortedNames = [...productNames].sort();

    expect(productNames).toEqual(sortedNames);
  });

  test('sorts products by name from Z to A', async ({ page }) => {
    await page.locator(selectors.sortDropdown).selectOption('za');

    const productNames = await getProductNames(page);
    const sortedNames = [...productNames].sort().reverse();

    expect(productNames).toEqual(sortedNames);
  });

  test('sorts products by price from low to high', async ({ page }) => {
    await page.locator(selectors.sortDropdown).selectOption('lohi');

    const productPrices = await getProductPrices(page);
    const sortedPrices = [...productPrices].sort((firstPrice, secondPrice) => {
      return firstPrice - secondPrice;
    });

    expect(productPrices).toEqual(sortedPrices);
  });

  test('sorts products by price from high to low', async ({ page }) => {
    await page.locator(selectors.sortDropdown).selectOption('hilo');

    const productPrices = await getProductPrices(page);
    const sortedPrices = [...productPrices].sort((firstPrice, secondPrice) => {
      return secondPrice - firstPrice;
    });

    expect(productPrices).toEqual(sortedPrices);
  });
});
