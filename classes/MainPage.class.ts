import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';
import defines from './defines';

export class MainPage extends BasePage {
  TRY_FOR_FREE_BTN: Locator;
  PRIVACY_POLICY_BTN: Locator;
  PRIVACY_POLICY_MODAL: Locator;
  PRIVACY_POLICY_TEXT: Locator;
  PRIVACY_POLICY_CLOSE_BTN: Locator;
  constructor(page: Page) {
    super(page);
    this.TRY_FOR_FREE_BTN = this.page.locator('a[href=signup]').filter({ hasText: 'Try it For Free' });
    this.PRIVACY_POLICY_BTN = this.page.locator('footer a').filter({ hasText: 'Privacy policy' });;
    this.PRIVACY_POLICY_MODAL = this.page.locator("div[id=modalPrivacy] div[class=modal-container]");
    this.PRIVACY_POLICY_TEXT = this.page.locator("div[id=modalPrivacy] div[class=modal-container] div[class=text-l]");
    this.PRIVACY_POLICY_MODAL = this.page.locator("div[id=modalPrivacy] div[class=modal-container]");
    this.PRIVACY_POLICY_CLOSE_BTN = this.page.locator("div[class*=modal-close-btn]").filter({ hasText: 'OK' });
  }
  async openMainPage() {
    await test.step(`Open main page`, async () => {
      await this.openPage(`${process.env.BASE_URL}`);
    });
  }
  async checkTryItForFreeBtn(btnIndex: number) {
    await test.step(`Сlick try it for free button`, async () => {
      expect(await this.TRY_FOR_FREE_BTN.count(), "Не найдена кнопка Try it for free").toBe(2);
      await this.TRY_FOR_FREE_BTN.nth(btnIndex).click();
      expect(this.page.url()).toBe(`${process.env.BASE_URL}/signup`);
    });
  }

  async checkPrivacyPolicy() {
    await test.step(`Сlick try it for free button`, async () => {
      await expect(this.PRIVACY_POLICY_BTN, "Не найдена кнопка Privacy policy").toBeAttached();
      await this.PRIVACY_POLICY_BTN.click();
      expect(await this.PRIVACY_POLICY_MODAL.isVisible(), "Не открылось окно Privacy policy").toBe(true);
      expect.soft(await this.PRIVACY_POLICY_TEXT.nth(0).innerText(), "Тест в первом абзаце Privacy policy не совпадает с эталоном").toBe(defines.privacyPolicy_1);
      expect.soft(await this.PRIVACY_POLICY_TEXT.nth(1).innerText(), "Тест во втором абзаце Privacy policy не совпадает с эталоном").toBe(defines.privacyPolicy_2);
      expect.soft(await this.PRIVACY_POLICY_TEXT.nth(2).innerText(), "Тест в третьем абзаце Privacy policy не совпадает с эталоном").toBe(defines.privacyPolicy_3);
      await this.PRIVACY_POLICY_CLOSE_BTN.first().click();
      expect(await this.PRIVACY_POLICY_MODAL.isVisible(), "Не закрылось окно Privacy policy").toBe(false);
    });
  }
}
