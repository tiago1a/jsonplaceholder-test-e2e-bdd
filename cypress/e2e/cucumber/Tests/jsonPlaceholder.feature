Feature: JSONPlaceholder Guide Navigation

  Scenario: Navigate to Guide and validate data from albums/1/photos
    Given I navigate to "https://jsonplaceholder.typicode.com"
    When I click on the "Guide" menu
    And I navigate to the link "/albums/1/photos"
    Then I capture the data displayed and save it to a JSON array
    And I validate the data of the object with id "6"
