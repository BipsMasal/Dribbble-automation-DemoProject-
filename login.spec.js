import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await navigateToLogin(page);
  await login(page, 'leerai', 'BORUTO2020');
  await searchProduct(page, 'naruto');
  await addToCart(page);
  await proceedToCheckout(page);
  await fillCheckoutForm(page, {
    firstName: 'Lee Hulan',
    lastName: 'Lohorung',
    address: 'Kapurdhara',
    apartment: '26',
    phone: '9840061716',
    email: 'leehulanrai45@gmail.com'
  });
});

async function navigateToLogin(page) {
  await page.goto('https://www.animestore.supremenepal.com/');
  await page.getByRole('link', { name: 'Login / Register' }).click();
}

async function login(page, username, password) {
  await page.getByLabel('Username or email address *').fill(username);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function searchProduct(page, productName) {
  await page.getByRole('searchbox', { name: 'Search…' }).fill(productName);
  await page.getByRole('searchbox', { name: 'Search…' }).press('Enter');
  await page.locator('div:nth-child(4) > .col-inner > .product-small > .box-image > .image-fade_in_back > a').click();
}

async function addToCart(page) {
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart / NRs 525' }).click();
}

async function proceedToCheckout(page) {
  await page.getByRole('link', { name: 'Proceed to checkout' }).click();
}

async function fillCheckoutForm(page, customerDetails) {
  await page.getByRole('textbox', { name: 'First name *' }).fill(customerDetails.firstName);
  await page.getByRole('textbox', { name: 'Last name *' }).fill(customerDetails.lastName);
  await page.getByRole('textbox', { name: 'Street address *' }).fill(customerDetails.address);
  await page.getByRole('textbox', { name: 'Apartment, House No. etc. (' }).fill(customerDetails.apartment);
  await page.getByLabel('Phone *').fill(customerDetails.phone);
  await page.getByLabel('Email address *').fill(customerDetails.email);
}