Feature: Add Product to Cart
  Scenario: User adds a product to the cart
    Given the user is on the product detail page for "Cotton T-shirt"
    When the user selects "Size: M" and "Color: Purple"
    And clicks the "Add to Cart" button
    Then a success message should appear
    And the cart item count should increase