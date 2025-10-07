export class CommonElements {    
    // Buttons
    buttonYes(index: number = 1) {
        return `(//*[text()='Yes'])[${index}]`;
    }
    buttonNo(index: number = 1) {
        return `(//*[text()='No'])[${index}]`;
    }

    // Input fields
    inputTextGeneric(index: number = 1) {
        return `(//*[@id='response'])[${index}]`;
    }

    // Holiday entitlement based on options
    optionDaysWorkedPerWeek = "//*[text()='days worked per week']";
    optionHoursWorkedPerWeek = "//*[text()='hours worked per week']";
    optionAnnualisedHours = "//*[text()='annualised hours']";
    optionCompressedHours = "//*[text()='compressed hours']";
    optionShifts = "//*[text()='shifts']";

    // Leave year options
    optionFullLeaveYear = "//*[text()='for a full leave year']";
    optionStartingPartWay = "//*[text()='for someone starting part way through a leave year']";
    optionLeavingPartWay = "//*[text()='for someone leaving part way through a leave year']";
    optionStartingAndLeavingPartWay = "//*[text()='for someone starting and leaving part way through a leave year']";

    // Summary table questions
    questionIrregularHours = "//*[text()='Does the employee work irregular hours or for part of the year?']";
    questionLeaveYearStart = "//*[text()='When does the leave year start?']";
    questionWeeklyHours = "//*[text()='How many hours does the employee work each week?']";
    questionAnnualLeave = "//*[text()='How much annual leave does the employee get?']";
    questionHolidayEntitlement = "//*[text()='What is the employee’s holiday entitlement?']";
    questionHolidayBasedOn = "//*[text()='Is the holiday entitlement based on:']"
    questionHolidayWorkOut = "//*[text()='Do you want to work out holiday:']"
    questionHoursWorkedPayPeriod = "//*[text()='How many hours has the employee worked in the pay period?']";
    questionWanToCalculateTheHoliday = "//*[text()='Do you want to calculate the holiday:']";
    questionEmploymentEndDate = "//*[text()='What was the employment end date?']";
    questionHoursPerShift = "//*[text()='How many hours in each shift?']";  
    questionShiftsPerPattern = "//*[text()='How many shifts will be worked per shift pattern?']";
    questionDaysPerShift = "//*[text()='How many days in the shift pattern?']";
}