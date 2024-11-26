Feature: Login Functionality

  Scenario: Successful Login
    Given I am on the home page
      When I click the sign in button
      And I enter my email "kevinnanashe@gmail.com" and password "Password@123"
      And I click the sing in confirmation button
      Then I should be logged in