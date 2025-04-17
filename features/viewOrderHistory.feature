Feature: View Order History

  Scenario: Logged-in user views their order history
    Given I am on the login page
    When I log in with valid credentials
    And I navigate to the My Orders page
    Then I should see the list of past orders or a message indicating no orders
    When I click on the first order in the list
    Then I should see the order details