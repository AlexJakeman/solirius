export class WelcomePage {    
    // Page headers
    calculateHolidayEntitlementHeader = "//*[text()='Calculate holiday entitlement']";
    
    // Buttons
    buttonStartNow(index: number = 1) {
        return `(//*[contains(text(), 'Start now')])[${index}]`;
    }

    // Cookies options
    buttonAcceptCookies(index: number = 1) {
        return `(//*[text()='Accept additional cookies'])[${index}]`;
    }
    buttonRejectCookies(index: number = 1) {
        return `(//*[text()='Reject additional cookies'])[${index}]`;
    }
}