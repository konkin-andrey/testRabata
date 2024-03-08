import { Page, test } from '@playwright/test';


export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openPage(url: string) {
    await test.step(`Open url: ${url}`, async () => {
      let success = false;
      while (!success) {
        try {
          await Promise.all([
            this.page.goto(url, { timeout: 20000 }),
            this.page.waitForResponse(response => response.ok(), { timeout: 20000 })
          ]);
          console.log(this.page);
          success = true;
        } catch (e) {
          await this.page.waitForTimeout(5000); // пауза между попытками
        }
      }
    });
  }

  async reload() {
    const currentUrl = this.page.url();
    await test.step(`Reloading page with url: ${currentUrl}`, async () => {
      await this.page.reload();
    });
  }
}
