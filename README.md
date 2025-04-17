# Magento Test Automation Framework

## Overview
This project automates critical use cases for the Magento Test Site using WebdriverIO with Cucumber.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd RedSoftware_CucumberWebDriverIO
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Downloading the Repository

To download the repository, follow these steps:
1. Navigate to the GitHub repository URL in your web browser.
2. Click on the green "Code" button.
3. Select "Download ZIP" to download the repository as a ZIP file.
4. Extract the ZIP file to your desired location on your computer.

### Running Tests
1. To run all tests:
   ```bash
   npx wdio run wdio.conf.js
   ```
2. To run a specific feature file:
   ```bash
   npx wdio run wdio.conf.js --spec features/<feature-file>.feature
   ```

### Generating Reports
1. Run tests to generate Allure results.
2. Serve the Allure report:
   ```bash
   npx allure serve reports/allure-results
   ```

### Viewing Allure Reports

To view the Allure report after running tests:
1. Ensure that the tests have been executed and the Allure results are generated in the `reports/allure-results` directory.
2. Serve the Allure report using the following command:
   ```bash
   npx allure serve reports/allure-results
   ```
3. This will open the Allure report in your default web browser.

## Test Scenarios

### 1. Add Product to Cart
- Validate that users can add a product to the cart by selecting size and color, and verify the success message and cart item count.

### 2. Product Detail Page
- Validate that users can view the product detail page by searching for a product and selecting it from the search results. Ensure the page displays complete product information.

### 3. Product Search
- Validate that users can search for a valid product and see relevant search results displayed.

### 4. View Order History
- Validate that logged-in users can view their order history, check the list of past orders, and verify the details of a selected order.

## Logging and Reporting
- Logging is implemented using a custom `logger.js` utility.
- Reports are generated using Allure for detailed insights into test execution.

## Folder Structure
- `features/`: Contains feature files for test scenarios.
- `step-definitions/`: Contains step definitions for the feature files.
- `utils/`: Contains utility files, such as `logger.js`.
- `reports/`: Contains test logs and Allure results.

## Contact
For any questions or issues, please contact [Your Name].