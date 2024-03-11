import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';

export class RegistrationPage extends BasePage {
  NAME_FIELD: Locator;
  SUBMIT_BUTTON: Locator;
  MAIL_FIELD: Locator;
  PASSWORD_FIELD_FST: Locator;
  PASSWORD_FIELD_SEC: Locator;
  CONF_CHBOX: Locator;
  SIGNUP_BTN: Locator;
  MAIL_ERROR_FLD: Locator;
  constructor(page: Page) {
    super(page);
    this.NAME_FIELD = this.page.locator('input[id=registration_form_fullName]');
    this.MAIL_FIELD = this.page.locator('input[id=registration_form_email]');
    this.PASSWORD_FIELD_FST = this.page.locator('input[id=registration_form_plainPassword_first]');
    this.PASSWORD_FIELD_SEC = this.page.locator('input[id=registration_form_plainPassword_second]');
    this.SUBMIT_BUTTON = this.page.locator('button[type=submit]');
    this.CONF_CHBOX = this.page.locator('input[id=registration_form_agreeTerms]');
    this.SIGNUP_BTN = this.page.locator('button').filter({ hasText: 'Sign up' })
    this.MAIL_ERROR_FLD = this.page.locator("p[data-error-map]");
  }

  async openLoginPage() {
    await test.step(`open login page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/login`);
    });
  }
  async setMail(mail: string) {
    await test.step(`set main ${mail}`, async () => {
      await this.MAIL_FIELD.clear();
      await this.MAIL_FIELD.fill(mail);
      expect(await this.MAIL_FIELD.inputValue()).toBe(mail);
    });
  }
  async setName(name: string) {
    await test.step(`set name ${name}`, async () => {
      await this.NAME_FIELD.clear();
      await this.NAME_FIELD.fill(name);
      expect(await this.NAME_FIELD.inputValue()).toBe(name);
    });
  }
  async setPasswords(password_fst: string, password_sec: string) {
    await test.step(`set password ${password_fst}`, async () => {
      await this.PASSWORD_FIELD_FST.clear();
      await this.PASSWORD_FIELD_FST.fill(password_fst);
      await this.PASSWORD_FIELD_SEC.clear();
      await this.PASSWORD_FIELD_SEC.fill(password_sec);
      expect((await this.PASSWORD_FIELD_FST.inputValue()).length).toBe(password_fst.length);
      expect((await this.PASSWORD_FIELD_SEC.inputValue()).length).toBe(password_fst.length);
    });
  }

  async setAgreeCheckBox() {
    await test.step(`set agree checkbox`, async () => {
      await this.CONF_CHBOX.evaluate((el: any) => el.click());
      await expect(this.CONF_CHBOX).toHaveClass("checkbox is-valid");
    });
  }

  async clickSignUpButton() {
    await test.step(`click "SignUp" btn`, async () => {
      await this.SIGNUP_BTN.click();
    });
  }

  async openRegistationPage() {
    await test.step(`open registration page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/signup`);
    });
  }

  async registerAs(name: string, mail: string, password_fst: string, password_sec = password_fst) {
    await test.step(`registr as name: ${name}, mail:${mail}, password_fst:${password_fst}`, async () => {
      await this.openRegistationPage();
      await this.setName(name);
      await this.setMail(mail);
      await this.setPasswords(password_fst, password_sec);
      await this.setAgreeCheckBox();
      await this.clickSignUpButton();
      expect(await this.MAIL_ERROR_FLD.count(), `При завершении регистрации возникла ошибка`).toBe(0);
    });
  }

}
