import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';

export class RegistrationPage extends BasePage {
    NAME_FIELD: Locator;
    SUBMIT_BUTTON: Locator;
    MAIL_FIELD: Locator;
    PASSWORD_FIELD_FST: Locator;
    PASSWORD_FIELD_SEC: Locator;
    CONF_CHBOX: Locator;
  constructor(page: Page) {
    super(page);
    this.NAME_FIELD = this.page.locator('input[id=registration_form_fullName]');
    this.MAIL_FIELD = this.page.locator('input[id=registration_form_email]');
    this.PASSWORD_FIELD_FST = this.page.locator('input[id=registration_form_plainPassword_first]');
    this.PASSWORD_FIELD_SEC = this.page.locator('input[id=registration_form_plainPassword_second]');
    this.SUBMIT_BUTTON = this.page.locator('button[type=submit]');
    this.CONF_CHBOX = this.page.locator('input[id=registration_form_agreeTerms]');
  }
  
  async openLoginPage() {
    await test.step(`Open login page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/login`);
    });
  }
  async setMail(login: string) {
    await test.step(`set login`, async () => {
      await this.MAIL_FIELD.clear();
      await this.MAIL_FIELD.type(login, {timeout: 250});
      expect(await this.MAIL_FIELD.inputValue()).toBe(login);
    });
  }
  async setName(login: string) {
    await test.step(`set name`, async () => {
      await this.NAME_FIELD.clear();
      await this.NAME_FIELD.type(login, {timeout: 250});
      expect(await this.NAME_FIELD.inputValue()).toBe(login);
    });
  }
  async setPasswords(password_fst: string, password_sec: string) {
    await test.step(`set password`, async () => {
      await this.PASSWORD_FIELD_FST.clear();
      await this.PASSWORD_FIELD_FST.type(password_fst, {timeout: 250});
      await this.PASSWORD_FIELD_SEC.clear();
      await this.PASSWORD_FIELD_SEC.type(password_sec, {timeout: 250});
      expect((await this.PASSWORD_FIELD_FST.inputValue()).length).toBe(password_fst.length);
      expect((await this.PASSWORD_FIELD_SEC.inputValue()).length).toBe(password_fst.length);
    });
  }

  async setAgreeCheckBox() {
    await test.step(`set agree checkbox`, async () => {
      await this.CONF_CHBOX.evaluate((el: any)=>el.click());
      await expect(this.CONF_CHBOX).toHaveClass("checkbox is-valid");
    });
  }

  async clickSubmitButton(password: string) {
    await test.step(`set password`, async () => {
      await this.SUBMIT_BUTTON.click();
    });
  }

  async openRegistationPage() {
    await test.step(`Open registration page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/signup`);
    });
  }

  async registerAs() {
    await test.step(`Login`, async () => {
      await this.openRegistationPage();
      await this.setName(`123123`);
      await this.setMail(`konkin@mail.ru`);
      await this.setPasswords(`I_see_dead_people_97`, 'I_see_dead_people_97');
      await this.setAgreeCheckBox();
    });
  }
  
}
