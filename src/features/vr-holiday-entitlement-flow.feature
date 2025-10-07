Feature: Visual Regression — Holiday Entitlement Flow
  As a QA engineer
  I want to verify that the holiday entitlement journey visually matches the expected screenshots
  So that UI changes can be detected automatically

  Scenario: Holiday entitlement journey matches expected visuals
    Given I am on the Welcome page
    And I accept cookies if presented
    Then the Start page should match the screenshot "01-start-page.png"
    When I start the calculator

    Then the 'irregular hours' question page should match the screenshot "02-irregular-hours.png"
    When I answer 'Yes' to the 'irregular hours' question
    And I continue

    Then the 'leave year start' question page should match the screenshot "03-leave-year-start.png"
    When I fill in the leave year start date as "01/02/2024"
    And I continue

    Then the 'holiday entitlement based on' question page should match the screenshot "04-holiday-based-on.png"
    When I select 'annualised hours'
    And I continue

    Then the 'work out holiday' question page should match the screenshot "05-work-out-holiday.png"
    When I select 'for a full leave year'
    And I continue

    Then the results page should be visible
    And it should match the screenshot "06-results-page.png"