import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';

export class LoginPage extends BasePage {
    LOGIN_FIELD: Locator;
    PASSWORD_FIELD: Locator;
    SUBMIT_BTN: Locator;
    TRY_FOR_FREE_BTN: Locator;
  constructor(page: Page) {
    super(page);
    this.LOGIN_FIELD = this.page.locator('input[id=username]');
    this.PASSWORD_FIELD = this.page.locator('input[id=password]');
    this.SUBMIT_BTN = this.page.locator('button').filter({ hasText: 'Log in' });
    this.TRY_FOR_FREE_BTN = this.page.locator('a[href=signup]');//.filter({ hasText: 'Try it For Free' });
  }

  async openLoginPage() {
    await test.step(`Open login page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/login`);
    });
  }
  async setLogin(login: string) {
    await test.step(`Set login`, async () => {
      await this.LOGIN_FIELD.clear();
      await this.LOGIN_FIELD.type(login, {timeout: 250});
      expect(await this.LOGIN_FIELD.inputValue()).toBe(login);
    });
  }
  async setPassword(password: string) {
    await test.step(`set password`, async () => {
      await this.PASSWORD_FIELD.clear();
      await this.PASSWORD_FIELD.type(password, {timeout: 250});
    });
  }

  async clickSubmitButton() {
    await test.step(`Сlick Submit button`, async () => {
      await this.SUBMIT_BTN.click();
    });
  }

  async loginAs(login: string, password: string) {
    await test.step(`Login as: ${login}, password: ${password}`, async () => {
      await this.openLoginPage();
      await this.setLogin(login);
      await this.setPassword(password);
      await this.clickSubmitButton();
    });
  }

}
