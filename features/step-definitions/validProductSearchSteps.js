const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');
const logger = require('../../utils/logger');
const allure = require('@wdio/allure-reporter').default;

Given('I am on the homepage', async () => {
  logger.info('Navigating to the homepage...');
  allure.addStep('Navigating to the homepage');
  await browser.url('https://magento.softwaretestingboard.com/');
});

When('I search for a valid product', async () => {
  const searchQuery = 'T-shirt';
  logger.info(`Searching for a valid product: ${searchQuery}`);
  allure.addStep(`Searching for a valid product: ${searchQuery}`);

  const searchInput = await $('#search');
  await searchInput.setValue(searchQuery);

  const searchButton = await $('button.action.search');
  await searchButton.click();

  logger.info('Waiting for product results to appear...');
  allure.addStep('Waiting for product results to appear');
  await $('li.product-item').waitForDisplayed({ timeout: 5000 });
});

Then('I should see relevant search results displayed', async () => {
  const productItems = await $$('li.product-item');
  logger.info(`Found ${productItems.length} product(s) in the search results.`);
  allure.addStep(`Found ${productItems.length} product(s) in the search results.`);
  assert.ok(productItems.length > 0, 'No products found in the search results');

  const searchQuery = 'T-shirt'.toLowerCase();
  const firstProductTitle = await $('li.product-item .product-item-link').getText();
  logger.info(`First product title: "${firstProductTitle}"`);
  allure.addStep(`First product title: "${firstProductTitle}"`);
  assert.ok(
    firstProductTitle.toLowerCase().includes(searchQuery) || firstProductTitle.toLowerCase().includes('tee'),
    `First product title "${firstProductTitle}" does not seem to match the search query`
  );
});

Given('I am on the homepage', async () => {
    logger.info('Navigating to the homepage');
    await browser.url('https://magento.softwaretestingboard.com/');
});

When('I search for {string}', async (searchTerm) => {
    logger.info(`Searching for product: ${searchTerm}`);
    const searchBox = await $('#search');
    await searchBox.setValue(searchTerm);
    await browser.keys('Enter');
});

Then('I should see search results for {string}', async (searchTerm) => {
    logger.info(`Verifying search results for: ${searchTerm}`);
    const searchResults = await $('.search.results');
    await searchResults.waitForDisplayed();
    const resultsText = await searchResults.getText();
    expect(resultsText).toContain(searchTerm);
    logger.info('Search results are displayed correctly');
});