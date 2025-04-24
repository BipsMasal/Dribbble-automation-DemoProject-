import { test, expect } from '@playwright/test';

// Function to navigate to the Dribbble homepage
async function navigateToHomePage(page) {
  await page.goto('https://dribbble.com/');
}

// Function to log in to Dribbble
async function login(page, username, password) {
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Username or Email').click();
  await page.getByLabel('Username or Email').fill(username);
  await page.getByLabel('Password Forgot?').click();
  await page.getByLabel('Password Forgot?').fill(password);
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
}

// Function to perform a search
async function search(page, query) {
  await page.getByPlaceholder('Search...').click();
  await page.getByPlaceholder('Search...').fill(query);
  await page.getByPlaceholder('Search...').press('Enter');
}

// Function to navigate through various sections
async function navigateSections(page) {
  await page.getByRole('link', { name: 'Shots' }).click();
  await page.getByRole('link', { name: 'Members' }).click();
  await page.getByRole('link', { name: 'Members' }).click(); // Double click to ensure navigation
  await page.getByRole('link', { name: 'Teams' }).click();
  await page.getByLabel('Back to home page').click();
}

// Function to edit profile details
async function editProfile(page) {
  await page.getByRole('link', { name: 'Bips11', exact: true }).dblclick();
  await page.getByRole('link', { name: 'Edit Profile' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('Bips11');
  await page.getByLabel('/1024').click();
  await page.getByLabel('/1024').fill('Gamers');
  await page.getByRole('button', { name: 'Save Profile' }).click();
}

// Function to change general account settings
async function changeGeneralSettings(page) {
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('bipin10');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByLabel('Back to home page').click();
}

// Main test function
test('test', async ({ page }) => {
  await navigateToHomePage(page);
  await login(page, 'rijanmajhi2121@gmail.com', 'bips123@');
  await search(page, 'logo');
  await navigateSections(page);
  await editProfile(page);
  await changeGeneralSettings(page);
});
