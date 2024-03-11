import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';

export class LoginPage extends BasePage {
  LOGIN_FIELD: Locator;
  PASSWORD_FIELD: Locator;
  SUBMIT_BTN: Locator;
  TRY_FOR_FREE_BTN: Locator;
  ERROR_MSG: Locator;
  constructor(page: Page) {
    super(page);
    this.LOGIN_FIELD = this.page.locator('input[id=username]');
    this.PASSWORD_FIELD = this.page.locator('input[id=password]');
    this.SUBMIT_BTN = this.page.locator('button').filter({ hasText: 'Log in' });
    this.TRY_FOR_FREE_BTN = this.page.locator('a[href=signup]');
    this.ERROR_MSG = this.page.locator("span[class*=input-error] span");
  }

  async openLoginPage() {
    await test.step(`Open login page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/login`);
    });
  }
  async setLogin(login: string) {
    await test.step(`set login`, async () => {
      await this.LOGIN_FIELD.clear();
      await this.LOGIN_FIELD.type(login, { delay: 25 });
      expect(await this.LOGIN_FIELD.inputValue()).toBe(login);
      expect(await this.ERROR_MSG.count(), `При заполнении логин возникла ошибка: ${await this.ERROR_MSG.allInnerTexts()}`).toBe(0);
    });
  }
  async setPassword(password: string) {
    await test.step(`set password`, async () => {
      await this.PASSWORD_FIELD.clear();
      await this.PASSWORD_FIELD.type(password, { delay: 25 });
      expect(await this.ERROR_MSG.count(), `При заполнении пароля возникла ошибка: ${await this.ERROR_MSG.allInnerTexts()}`).toBe(0);
    });
  }

  async clickSubmitButton() {
    await test.step(`click Submit button`, async () => {
      await this.SUBMIT_BTN.click();
      expect(this.page.url(), "Не удалось выполнить вход с указанными учетными данными").toBe(`${process.env.BASE_URL}/dashboard`);
    });
  }

  async loginAs(login: string, password: string) {
    await test.step(`login as: ${login}, password: ${password}`, async () => {
      await this.openLoginPage();
      await this.setLogin(login);
      await this.setPassword(password);
      await this.clickSubmitButton();
    });
  }

}
