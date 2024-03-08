import { Browser, Page, chromium, test } from '@playwright/test';


export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openPage(url: string): Promise<Page | null> {
    const browser: Browser = await chromium.launch();
    this.page = await browser.newPage();
    let success = false;
    
    try {
        while (!success) {
            try {
                await Promise.all([
                    this.page.goto(url, { timeout: 20000 }),
                    this.page.waitForResponse(response => response.ok(), { timeout: 20000 })
                ]);
                success = true;
            } catch (e) {
                await this.page.waitForTimeout(5000); // пауза между попытками
            }
        }
        return this.page;
    } catch (error) {
        console.error('Ошибка при открытии страницы:', error);
        return null;
    } finally {
        await browser.close();
    }
}

  async reload() {
    const currentUrl = this.page.url();
    await test.step(`Reloading page with url: ${currentUrl}`, async () => {
      await this.page.reload();
    });
  }
}
