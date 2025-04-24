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

// Function to apply filters and sign out with hover
async function applyFiltersAndSignOut(page) {
  await page.goto('https://dribbble.com/following');
  await page.getByRole('link', { name: 'Filters' }).click();
  await page.locator('#tag').click();
  await page.locator('#tag').fill('logo');
  await page.getByPlaceholder('Enter hex or select').click();
  await page.getByRole('link', { name: '#e5d1fa' }).click();
  await page.locator('#home').press('Enter');
  await page.locator('fieldset').filter({ hasText: 'Clear Color #faddd1 #fad3d1 #' }).getByRole('link').click();

  // Hover over the user menu or avatar to reveal the sign out option
  await page.hover('.nav-v2-avatar__image');

  // Sign out
  await page.getByRole('button', { name: 'Sign out' }).click();
}

// Group for Login Tests
test.describe('Login Tests', () => {
  test('Should log in with valid credentials', async ({ page }) => {
    await navigateToHomePage(page);
    await login(page, 'rijanmajhi2121@gmail.com', 'bips123@');
  });

  
});
test.describe('Invalid Login', () => {
  test('Invalid login test', async ({ page }) => {
    await navigateToHomePage(page);
    await login(page, 'bipinmasal@gmail.com', 'wrongpassword');
  
    // Check for the specific error message element
    const errorMessage = await page.locator('.notice.error[role="alert"] h2').textContent();
  
    expect(errorMessage).toContain("We couldn’t find an account matching the email and password you entered. Please check your email and password and try again.");
  });
});

// Group for Profile Tests
test.describe('Profile Tests', () => {
  test('Should edit profile details', async ({ page }) => {
    await navigateToHomePage(page);
    await login(page, 'rijanmajhi2121@gmail.com', 'bips123@');
    await editProfile(page);
  });
});

// Group for Search Tests
test.describe('Search Tests', () => {
  test('Should search for a logo', async ({ page }) => {
    await navigateToHomePage(page);
    await login(page, 'rijanmajhi2121@gmail.com', 'bips123@');
    await search(page, 'logo');
    await navigateSections(page);
  });
});

// Group for Filter and Sign Out Tests
test.describe('Filter and Sign Out Tests', () => {
  test.only('Should apply filters and sign out', async ({ page }) => {
    await navigateToHomePage(page);
    await login(page, 'rijanmajhi2121@gmail.com', 'bips123@');
    await applyFiltersAndSignOut(page);
  });
});
