Feature: Product Search

  Scenario: User searches for a valid product
    Given I am on the homepage
    When I search for a valid product
    Then I should see relevant search results displayed
