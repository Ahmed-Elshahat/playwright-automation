import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Template Page Object
 * Use this as a reference for creating new Page Objects.
 * 
 * Best Practices:
 * 1. Keep locators in the constructor.
 * 2. Use accessibility-friendly locators (getByRole) where possible.
 * 3. Methods should return specific values or Promises (async).
 */
export class TemplatePage {
    readonly page: Page;
    readonly header: Locator;
    readonly primaryButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('h1').first();
        this.primaryButton = page.getByRole('button', { name: 'Submit' });
    }

    async goto(path: string) {
        await this.page.goto(path);
    }

    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(new RegExp(expectedTitle));
    }

    async performAction() {
        if (await this.primaryButton.isVisible()) {
            await this.primaryButton.click();
        }
    }
}
