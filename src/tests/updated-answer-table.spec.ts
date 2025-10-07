import { test, expect } from '@playwright/test';
import { WelcomePage } from '../pages/welcome_page.ts';
import { QuestionPages } from '../pages/question_pages.ts';
import { ResultPage } from '../pages/result_page.ts';
import { CommonElements } from '../pages/common_elements.ts';

const welcomePage = new WelcomePage();
const questionPages = new QuestionPages();
const resultPage = new ResultPage();
const commonElements = new CommonElements();

test.describe('GOV.UK — Holiday Entitlement Summary and Change Flow', () => {
    const baseUrl = 'https://www.gov.uk';
        
    test('User can change answers and summary table updates correctly', async ({ page }) => {
        // Navigate to start page
        await page.goto(`${baseUrl}/calculate-your-holiday-entitlement`);

        // Accept cookies if the banner appears
        try {
            await page.click(welcomePage.buttonAcceptCookies(), { timeout: 3000 });
        } catch {
            console.log('No cookies banner displayed.');
        }

        // Verify Start now button is visible and click it
        await expect(page.locator(welcomePage.buttonStartNow())).toBeVisible();
        await page.click(welcomePage.buttonStartNow());

        // Answer 'irregular hours' question (Yes)
        await expect(page.locator(commonElements.questionIrregularHours)).toBeVisible();
        await page.click(commonElements.buttonYes());
        await page.click(questionPages.buttonContinue());

        // Answer the 'leave year start' question
        await expect(page.locator(commonElements.questionLeaveYearStart)).toBeVisible();
        await page.fill(questionPages.inputDateDay(), '01');
        await page.fill(questionPages.inputDateMonth(), '02');
        await page.fill(questionPages.inputDateYear(), '2024');
        await page.click(questionPages.buttonContinue());

        // Answer the 'holiday entitlement based on' question
        await expect(page.locator(commonElements.questionHolidayBasedOn)).toBeVisible();
        await page.click(commonElements.optionAnnualisedHours);
        await page.click(questionPages.buttonContinue());

        // Answer the 'work out holiday for' question
        await expect(page.locator(commonElements.questionHolidayWorkOut)).toBeVisible();
        await page.click(commonElements.optionFullLeaveYear);
        await page.click(questionPages.buttonContinue());

        // Verify that the result is displayed
        await expect(page.locator(resultPage.expectedResultHolidayEntitlement)).toBeVisible();

        // Verify initial answers
        await expect(page.locator(resultPage.summaryTable)).toBeVisible();
        await expect(page.locator(resultPage.summaryTable)).toContainText("Does the employee work irregular hours or for part of the year?");
        await expect(page.locator(resultPage.summaryTable)).toContainText("Yes");
        await expect(page.locator(resultPage.summaryTable)).toContainText("1 February 2024");
        await expect(page.locator(resultPage.summaryTable)).toContainText("annualised hours");
        await expect(page.locator(resultPage.summaryTable)).toContainText("for a full leave year");

        // Select change following first option
        await page.click(resultPage.buttonChangeIrregularHours());

        // Answer 'irregular hours' question (No)
        await expect(page.locator(commonElements.questionIrregularHours)).toBeVisible();
        await page.click(commonElements.buttonNo());
        await page.click(questionPages.buttonContinue());

        // Answer the 'holiday entitlement based on' question
        await expect(page.locator(commonElements.questionHolidayBasedOn)).toBeVisible();
        await page.click(commonElements.optionShifts);
        await page.click(questionPages.buttonContinue());

            // Answer the 'holiday entitlement based on' question
        await expect(page.locator(commonElements.questionHolidayBasedOn)).toBeVisible();
        await page.click(commonElements.optionLeavingPartWay);
        await page.click(questionPages.buttonContinue());

        // Answer the 'employment end date' question
        await expect(page.locator(commonElements.questionEmploymentEndDate)).toBeVisible();
        await page.fill(questionPages.inputDateDay(), '22');
        await page.fill(questionPages.inputDateMonth(), '10');
        await page.fill(questionPages.inputDateYear(), '2022');
        await page.click(questionPages.buttonContinue());

        // Answer the 'leave year start' question
        await expect(page.locator(commonElements.questionLeaveYearStart)).toBeVisible();
        await page.fill(questionPages.inputDateDay(), '06');
        await page.fill(questionPages.inputDateMonth(), '04');
        await page.fill(questionPages.inputDateYear(), '2022');
        await page.click(questionPages.buttonContinue());

        // Answer the 'how many hours per shift' question
        await expect(page.locator(commonElements.questionHoursPerShift)).toBeVisible();
        await page.fill(commonElements.inputTextGeneric(), '9');
        await page.click(questionPages.buttonContinue());

        // Answer the 'how many shifts per shift pattern' question
        await expect(page.locator(commonElements.questionShiftsPerPattern)).toBeVisible();
        await page.fill(commonElements.inputTextGeneric(), '5');
        await page.click(questionPages.buttonContinue());

        // Answer the 'how many many days in the shift pattern' question
        await expect(page.locator(commonElements.questionDaysPerShift)).toBeVisible();
        await page.fill(commonElements.inputTextGeneric(), '7');
        await page.click(questionPages.buttonContinue());

        // Verify summary table updated
        await expect(page.locator(resultPage.summaryTable)).toContainText("No");
        await expect(page.locator(resultPage.summaryTable)).toContainText("shifts");
        await expect(page.locator(resultPage.summaryTable)).toContainText("for someone leaving part way through a leave year");
        await expect(page.locator(resultPage.summaryTable)).toContainText("22 October 2022");
        await expect(page.locator(resultPage.summaryTable)).toContainText("6 April 2022");
        await expect(page.locator(resultPage.summaryTable)).toContainText("9.0");
        await expect(page.locator(resultPage.summaryTable)).toContainText("5");
        await expect(page.locator(resultPage.summaryTable)).toContainText("7.0");
        await expect(page.locator(resultPage.buttonStartAgain())).toBeVisible();
    });
});