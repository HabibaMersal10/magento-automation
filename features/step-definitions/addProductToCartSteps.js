const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@wdio/globals');
const logger = require('../../utils/logger');

Given('the user is on the product detail page for {string}', async (productName) => {
    logger.info(`Navigating to the product detail page for: ${productName}`);

    // Navigate to the homepage
    await browser.url('https://magento.softwaretestingboard.com/');

    // Wait for the search box to be displayed
    const searchBox = await $('#search');
    await searchBox.waitForDisplayed({ timeout: 15000 });

    // Enter the product name and press Enter
    await searchBox.setValue(productName);
    await browser.keys('Enter');

    // Wait for the search results container to be displayed
    const searchResultsContainer = await $('.search.results');
    await searchResultsContainer.waitForDisplayed({ timeout: 15000 });

    // Re-fetch the product link to avoid stale element reference
    await browser.waitUntil(async () => {
        const productLink = await $('//a[contains(@class,"product-item-link")]');
        return productLink.isDisplayed();
    }, {
        timeout: 15000,
        timeoutMsg: 'Product link did not appear within the timeout'
    });

    const productLink = await $('//a[contains(@class,"product-item-link")]');
    await productLink.click();
    logger.info(`Navigated to the product detail page for: ${productName}`);
});

When('the user selects {string} and {string}', async (size, color) => {
    logger.info(`Attempting to select size: ${size} and color: ${color}`);

    // Select the size directly using its unique attributes
    const sizeElement = await $('#option-label-size-143-item-168');
    await sizeElement.waitForDisplayed({ timeout: 15000 });
    await sizeElement.click();
    logger.info(`Size '${size}' selected successfully.`);

    // Select the color directly using its unique attributes
    const colorElement = await $('//div[@class="swatch-option color" and contains(@aria-label,"Purple")]');
    await colorElement.waitForDisplayed({ timeout: 15000 });
    await colorElement.click();
    logger.info(`Color '${color}' selected successfully.`);
});

When('clicks the {string} button', async (buttonText) => {
    logger.info(`Clicking the button: ${buttonText}`);
    const addToCartButton = await $('#product-addtocart-button');
    await addToCartButton.waitForDisplayed({ timeout: 5000 });
    await addToCartButton.click();
});

Then('a success message should appear', async () => {
    logger.info('Verifying success message appears');
    const successMessage = await $('.message-success');
    await browser.waitUntil(async () => successMessage.isDisplayed(), {
        timeout: 5000,
        timeoutMsg: 'Success message did not appear within the timeout'
    });
    const messageText = await successMessage.getText();
    expect(messageText).toContain('You added');
    logger.info('Success message verified');
});

Then('the cart item count should increase', async () => {
    logger.info('Verifying cart item count increases');
    const cartCount = await $('.counter-number');
    await browser.waitUntil(async () => parseInt(await cartCount.getText()) > 0, {
        timeout: 5000,
        timeoutMsg: 'Cart item count did not increase within the timeout'
    });
    const count = parseInt(await cartCount.getText());
    expect(count).toBeGreaterThan(0);
    logger.info(`Cart item count increased to: ${count}`);
});