import { test, expect } from '@playwright/test';
import { WelcomePage } from '../pages/welcome_page.ts';
import { QuestionPages } from '../pages/question_pages.ts';
import { ResultPage } from '../pages/result_page.ts';
import { CommonElements } from '../pages/common_elements.ts';

const welcomePage = new WelcomePage();
const questionPages = new QuestionPages();
const resultPage = new ResultPage();
const commonElements = new CommonElements();

test.describe('GOV.UK — Visual Regression: Holiday Entitlement Flow', () => {
    const baseUrl = 'https://www.gov.uk';
    const screenshotDir = 'vr-basic-flow.spec.ts-snapshots';

    test('Holiday entitlement journey matches expected visuals', async ({ page }) => {
        // Navigate to start page
        await page.goto(`${baseUrl}/calculate-your-holiday-entitlement`);
        await page.setViewportSize({ width: 1920, height: 1080 });

        // Accept cookies if visible
        try {
        await page.click(welcomePage.buttonAcceptCookies(), { timeout: 3000 });
        } catch {
        console.log('No cookies banner displayed.');
        }

        // Verify Start now button is visible and click it
        await expect(page.locator(welcomePage.buttonStartNow())).toBeVisible();
        await expect(page).toHaveScreenshot(`${screenshotDir}/01-start-page.png`);
        await page.click(welcomePage.buttonStartNow());

        // Answer 'irregular hours' question (Yes)
        await expect(page.locator(commonElements.questionIrregularHours)).toBeVisible();
        await expect(page).toHaveScreenshot(`${screenshotDir}/02-irregular-hours.png`);
        await page.click(commonElements.buttonYes());
        await page.click(questionPages.buttonContinue());

        // Answer the 'leave year start' question
        await expect(page.locator(commonElements.questionLeaveYearStart)).toBeVisible();
        await expect(page).toHaveScreenshot(`${screenshotDir}/03-leave-year-start.png`);
        await page.fill(questionPages.inputDateDay(), '01');
        await page.fill(questionPages.inputDateMonth(), '02');
        await page.fill(questionPages.inputDateYear(), '2024');
        await page.click(questionPages.buttonContinue());

        // Answer the 'holiday entitlement based on' question
        await expect(page.locator(commonElements.questionHolidayBasedOn)).toBeVisible();
        await expect(page).toHaveScreenshot(`${screenshotDir}/04-holiday-based-on.png`);
        await page.click(commonElements.optionAnnualisedHours);
        await page.click(questionPages.buttonContinue());

        // Answer the 'work out holiday for' question
        await expect(page.locator(commonElements.questionHolidayWorkOut)).toBeVisible();
        await expect(page).toHaveScreenshot(`${screenshotDir}/05-work-out-holiday.png`);
        await page.click(commonElements.optionFullLeaveYear);
        await page.click(questionPages.buttonContinue());

        // Verify that the result is displayed
        await expect(page.locator(resultPage.expectedResultHolidayEntitlement)).toBeVisible();
        await expect(page).toHaveScreenshot(`${screenshotDir}/06-results-page.png`);
    });
});