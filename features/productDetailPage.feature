Feature: Product Detail Page
  Scenario: User views product detail page
    Given the user is on the homepage
    When the user searches for "T-shirt" and presses enter
    And clicks the first product from the search results
    Then the product detail page should display complete information
