import { test, expect } from '@playwright/test';
import { WelcomePage } from '../pages/welcome_page.ts';
import { QuestionPages } from '../pages/question_pages.ts';
import { ResultPage } from '../pages/result_page.ts';
import { CommonElements } from '../pages/common_elements.ts';

const welcomePage = new WelcomePage();
const questionPages = new QuestionPages();
const resultPage = new ResultPage();
const commonElements = new CommonElements();

test.describe('GOV.UK — Holiday entitlement date validation', () => {
    const baseUrl = 'https://www.gov.uk';

    test('Shows error messages for invalid leave year start dates', async ({ page }) => {
        // Navigate to start page
        await page.goto(`${baseUrl}/calculate-your-holiday-entitlement`);

        // Accept cookies if banner appears
        try {
        await page.click(welcomePage.buttonAcceptCookies(), { timeout: 3000 });
        } catch {}

        // Start calculator
        await page.click(welcomePage.buttonStartNow());

        // Answer 'irregular hours' question (Yes)
        await expect(page.locator(commonElements.questionIrregularHours)).toBeVisible();
        await page.click(commonElements.buttonYes());
        await page.click(questionPages.buttonContinue());

        // Answer the 'leave year start' question
        await expect(page.locator(commonElements.questionLeaveYearStart)).toBeVisible();

        // Answer the 'holiday entitlement based on' question with an invalid date
        await page.fill(questionPages.inputDateDay(), '32');
        await page.fill(questionPages.inputDateMonth(), '02');
        await page.fill(questionPages.inputDateYear(), '2024');
        await page.click(questionPages.buttonContinue());

        // Verify error message is shown
        await expect(page.locator(questionPages.errorThereIsAProblem)).toBeVisible();
        await expect(page.locator(questionPages.errorPleaseAnswerThisQuestion)).toBeVisible();

        // Answer the 'holiday entitlement based on' question with an invalid month
        await page.fill(questionPages.inputDateDay(), '01');
        await page.fill(questionPages.inputDateMonth(), '13');
        await page.fill(questionPages.inputDateYear(), '2024');
        await page.click(questionPages.buttonContinue());

        // Verify error message is shown
        await expect(page.locator(questionPages.errorThereIsAProblem)).toBeVisible();
        await expect(page.locator(questionPages.errorPleaseAnswerThisQuestion)).toBeVisible();

        // Answer the 'holiday entitlement based on' question with an invalid date based on leap year
        await page.fill(questionPages.inputDateDay(), '29');
        await page.fill(questionPages.inputDateMonth(), '02');
        await page.fill(questionPages.inputDateYear(), '2025');
        await page.click(questionPages.buttonContinue());

        // Verify error message is shown
        await expect(page.locator(questionPages.errorThereIsAProblem)).toBeVisible();
        await expect(page.locator(questionPages.errorPleaseAnswerThisQuestion)).toBeVisible();
    
        // Answer the 'holiday entitlement based on' question with an invalid date based on leap year
        await page.fill(questionPages.inputDateDay(), '29');
        await page.fill(questionPages.inputDateMonth(), '02');
        await page.fill(questionPages.inputDateYear(), '2024');
        await page.click(questionPages.buttonContinue());

        // Verify the next question appears (means date accepted)
        await expect(page.locator(commonElements.questionHolidayBasedOn)).toBeVisible();
    });
});