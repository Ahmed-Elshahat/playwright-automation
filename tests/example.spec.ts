import { test } from '@playwright/test';
import { TemplatePage } from '../pages/TemplatePage';
import { TestDataFile } from '../types/example';
import * as baseData from '../test-data/example-data.json';

// Cast imported JSON to the strictly typed interface
const data = baseData as unknown as TestDataFile;

test.describe('Template Test Suite', () => {

    test('Example Verification Test', async ({ page }) => {
        // Initialize Page Object
        const templatePage = new TemplatePage(page);

        // Navigate using data
        await templatePage.goto(data.templateScenario.url);

        // Perform Verification
        await templatePage.verifyTitle(data.templateScenario.expectedTitle);

        // Example assertion
        await templatePage.header.isVisible();
    });

});
