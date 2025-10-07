import { test, expect } from '@playwright/test';
import { WelcomePage } from '../pages/welcome_page.ts';
import { QuestionPages } from '../pages/question_pages.ts';
import { ResultPage } from '../pages/result_page.ts';
import { CommonElements } from '../pages/common_elements.ts';

const welcomePage = new WelcomePage();
const questionPages = new QuestionPages();
const resultPage = new ResultPage();
const commonElements = new CommonElements();


test.describe('GOV.UK — Calculate holiday entitlement', () => {
    const baseUrl = 'https://www.gov.uk';

    test('User can calculate holiday entitlement for an employee', async ({ page }) => {
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
    });
});
