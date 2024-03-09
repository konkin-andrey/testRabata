import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';

export class LoginPage extends BasePage {
    LOGIN_FIELD: Locator;
    PASSWORD_FIELD: Locator;
    SUBMIT_BUTTON: Locator;
  constructor(page: Page) {
    super(page);
    this.LOGIN_FIELD = this.page.locator('input[id=username]');
    this.PASSWORD_FIELD = this.page.locator('input[id=password]');
    this.SUBMIT_BUTTON = this.page.locator('button[type=submit]');
  }

  async openLoginPage() {
    await test.step(`Open login page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/login`);
    });
  }
  async setLogin(login: string) {
    await test.step(`set login`, async () => {
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

  async clickSubmitButton(password: string) {
    await test.step(`set password`, async () => {
      await this.SUBMIT_BUTTON.click();
    });
  }

  async loginAs() {
    await test.step(`Login`, async () => {
      await this.openLoginPage();
      await this.setLogin(`123123`);
      await this.setPassword(`123345`);
    });
  }
  
}
