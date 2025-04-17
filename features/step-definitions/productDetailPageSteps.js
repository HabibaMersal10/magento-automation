const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@wdio/globals');

Given('the user is on the homepage', async () => {
    await browser.url('https://magento.softwaretestingboard.com/');
});

When('the user searches for {string} and presses enter', async (searchTerm) => {
    const searchBox = await $('#search');
    await searchBox.setValue(searchTerm);
    await browser.keys('Enter');
});

When('clicks the first product from the search results', async () => {
    const firstProduct = await $('//a[contains(@class,"product-item-link")]');
    await firstProduct.click();
});

Then('the product detail page should display complete information', async () => {
    await browser.waitUntil(async () => {
        const productTitle = await $('.page-title');
        return productTitle.isDisplayed();
    });

    const productDetails = {
        name: await $('.page-title').getText(),
        price: await $('.price').getText(),
        description: await $('.product.attribute.description').getText(),
        image: await $('.gallery-placeholder').isDisplayed(),
        addToCart: await $('#product-addtocart-button').isDisplayed()
    };

    expect(productDetails.name).toBeDefined();
    expect(productDetails.price).toBeDefined();
    expect(productDetails.description).toBeDefined();
    expect(productDetails.image).toBe(true);
    expect(productDetails.addToCart).toBe(true);

    // Updated checks for details, SKU, and price
    const details = await $('#description');
    const sku = await $('.product.attribute.sku');
    const price = await $('.price');

    console.log('Checking if details are displayed...');
    await details.waitForDisplayed();
    expect(await details.isDisplayed()).toBe(true);

    console.log('Checking if SKU is displayed...');
    await sku.waitForDisplayed();
    expect(await sku.isDisplayed()).toBe(true);

    console.log('Checking if price is displayed...');
    await price.waitForDisplayed();
    expect(await price.isDisplayed()).toBe(true);
});
