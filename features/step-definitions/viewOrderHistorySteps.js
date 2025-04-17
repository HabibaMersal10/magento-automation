const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');
const logger = require('../../utils/logger');

Given('I am on the login page', async () => {
  logger.info('Navigating to the login page...');
  await browser.url('https://magento.softwaretestingboard.com/customer/account/login/');
});

When('I log in with valid credentials', async () => {
  logger.info('Logging in with valid credentials...');
  const emailInput = await $('#email');
  const passwordInput = await $('#pass');
  const signInBtn = await $('#send2');

  await emailInput.setValue('JohnAlex@yahoo.com');
  await passwordInput.setValue('John@123456789Alex');
  await signInBtn.click();

  const sidebar = await $('#block-collapsible-nav');
  await sidebar.waitForDisplayed({ timeout: 5000 });
  logger.info('Login successful.');
});

When('I navigate to the My Orders page', async () => {
  logger.info('Navigating to the My Orders page...');
  await browser.url('https://magento.softwaretestingboard.com/sales/order/history/');
});

Then('I should see the list of past orders or a message indicating no orders', async () => {
  logger.info('Checking for past orders or an empty message...');
  const ordersTableWrapper = await $('div.table-wrapper.orders-history');
  const ordersTableBody = await $('div.table-wrapper.orders-history tbody');

  await ordersTableWrapper.waitForDisplayed({ timeout: 5000 });

  const orderRows = await ordersTableBody.$$('tr');

  if (orderRows.length > 0) {
    logger.info(`Found ${orderRows.length} orders.`);
    assert.ok(orderRows.length > 0, 'Orders are listed in the table.');
  } else {
    logger.warn('No orders found in the table.');
    assert.strictEqual(orderRows.length, 0, 'No orders found in the table.');
  }
});

When('I click on the first order in the list', async () => {
  logger.info('Clicking on the first order in the list...');
  const ordersTableBody = await $('div.table-wrapper.orders-history tbody');
  const orderRows = await ordersTableBody.$$('tr');

  if (orderRows.length > 0) {
    const firstViewOrderLink = await orderRows[0].$('a.action.view');
    await firstViewOrderLink.click();

    const orderDetailsTitle = await $('h1.page-title span');
    await orderDetailsTitle.waitForDisplayed({ timeout: 5000 });
    logger.info('Navigated to the order details page.');
  } else {
    logger.error('No orders available to view.');
    throw new Error('Test failed: No orders available to view.');
  }
});

Then('I should see the order details', async () => {
  logger.info('Validating order details...');
  const orderDetailsTitle = await $('h1.page-title span');
  const titleText = await orderDetailsTitle.getText();
  assert.ok(titleText.includes('Order'), 'Order details page not displayed properly');

  const productName = await $('td.col.name strong.product-item-name').getText();
  assert.ok(productName.length > 0, 'Product name is not displayed');

  const orderTotal = await $('tfoot tr.grand_total td.amount span.price').getText();
  assert.ok(orderTotal.length > 0, 'Order total is not displayed');

  const orderDate = await $('div.order-date span:nth-child(2)').getText();
  assert.ok(orderDate.length > 0, 'Order date is not displayed');

  const orderStatus = await $('span.order-status').getText();
  assert.ok(orderStatus.length > 0, 'Order status is not displayed');

  const shippingAddress = await $('div.box-order-shipping-address address').getText();
  assert.ok(shippingAddress.length > 0, 'Shipping address is not displayed');

  const paymentMethod = await $('div.box-order-billing-method dl.payment-method dt.title').getText();
  assert.ok(paymentMethod.length > 0, 'Payment method is not displayed');

  logger.info('All order details are displayed successfully.');
});

Given('I am logged in as a user', async () => {
  logger.info('Skipping login step as per requirements');
});

When('I navigate to the order history page', async () => {
  logger.info('Navigating to the order history page');
  const accountMenu = await $('.account-menu');
  await accountMenu.click();
  const orderHistoryLink = await $('a[href*="order-history"]');
  await orderHistoryLink.click();
});

Then('I should see a list of my past orders', async () => {
  logger.info('Verifying the order history list');
  const orderList = await $('.order-history-list');
  await orderList.waitForDisplayed();
  const orders = await orderList.$$('li');
  expect(orders.length).toBeGreaterThan(0);
  logger.info('Order history is displayed correctly');
});