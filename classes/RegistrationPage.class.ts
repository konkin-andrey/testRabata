import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';
import { RegData } from '../types';
export class RegistrationPage extends BasePage {
    NAME_FIELD: Locator;
    SUBMIT_BUTTON: Locator;
    MAIL_FIELD: Locator;
    PASSWORD_FIELD_FST: Locator;
    PASSWORD_FIELD_SEC: Locator;
    CONF_CHBOX: Locator;
    SIGNUP_BTN: Locator;
  constructor(page: Page) {
    super(page);
    this.NAME_FIELD = this.page.locator('input[id=registration_form_fullName]');
    this.MAIL_FIELD = this.page.locator('input[id=registration_form_email]');
    this.PASSWORD_FIELD_FST = this.page.locator('input[id=registration_form_plainPassword_first]');
    this.PASSWORD_FIELD_SEC = this.page.locator('input[id=registration_form_plainPassword_second]');
    this.SUBMIT_BUTTON = this.page.locator('button[type=submit]');
    this.CONF_CHBOX = this.page.locator('input[id=registration_form_agreeTerms]');
    this.SIGNUP_BTN = this.page.locator('button').filter({ hasText: 'Sign up' })

  }
  
  async openLoginPage() {
    await test.step(`Open login page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/login`);
    });
  }
  async setMail(login: string) {
    await test.step(`set login`, async () => {
      await this.MAIL_FIELD.clear();
      await this.MAIL_FIELD.type(login, {timeout: 500});
      expect(await this.MAIL_FIELD.inputValue()).toBe(login);
    });
  }
  async setName(login: string) {
    await test.step(`set name`, async () => {
      await this.NAME_FIELD.clear();
      await this.NAME_FIELD.type(login, {timeout: 500});
      expect(await this.NAME_FIELD.inputValue()).toBe(login);
    });
  }
  async setPasswords(password_fst: string, password_sec: string) {
    await test.step(`set password`, async () => {
      await this.PASSWORD_FIELD_FST.clear();
      await this.PASSWORD_FIELD_FST.type(password_fst, {timeout: 500});
      await this.PASSWORD_FIELD_SEC.clear();
      await this.PASSWORD_FIELD_SEC.type(password_sec, {timeout: 500});
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

  async clickSignUpButton() {
    await test.step(`set password`, async () => {
      await this.SIGNUP_BTN.click();
    });
  }

  async openRegistationPage() {
    await test.step(`Open registration page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/signup`);
    });
  }

  async registerAs(name: string, mail: string, password_fst: string, password_sec = password_fst) {
    await test.step(`Login`, async () => {
      await this.openRegistationPage();
      const MailosaurClient = require("mailosaur");
      const mailosaur = new MailosaurClient("gFTFP7QNlnsE52Dwx9SNv40rUVm7qfzZ");
      const delay = ms => new Promise(r => setTimeout(r, ms));
      await delay(3000);
      await this.setName(name);
      await this.setMail(mail);
      await this.setPasswords(password_fst, password_sec);
      await this.setAgreeCheckBox();
      await this.clickSignUpButton();
     
      await delay(10000);
      
      const email = await mailosaur.messages.get("cahemglc", {
        sentTo: "anything@cahemglc.mailosaur.net",
      });
      console.log("email", email);
    });
  }
  
}
