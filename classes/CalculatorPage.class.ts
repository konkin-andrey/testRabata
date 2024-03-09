import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';
export class CalculatorPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async openCalculator() {
    await test.step(`Open calculator page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/#calculator`);
    });
  }


}
