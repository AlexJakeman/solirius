export class ResultPage {    
    // Page headers
    resultHeader = "//*[text()='Holiday entitlement']";
    
    // Expected page text / results
    expectedResultHolidayEntitlement = "//*[text()='The statutory holiday entitlement is 5.6 weeks holiday.']"; // This is for a full-time employee

    // Buttons
    buttonChangeSummaryTable = "//*[contains(text(), 'Change')]"
    buttonStartAgain(index: number = 1) {
        return `(//*[text()='Start again'])[${index}]`;
    }
    buttonChangeIrregularHours(index: number = 1) {
        return `(//*[text()='Does the employee work irregular hours or for part of the year?'])[${index}]/following::*[contains(text(),'Change')][1]`;
    }

    // Summary table
    summaryTable = "//dl[contains(@class, 'govuk-summary-list')]";
}