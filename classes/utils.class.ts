
import { APIRequestContext, Browser, expect, test } from "@playwright/test";
import MailosaurClient from "mailosaur";

export class Utils {


  async getMailLink(apiKey: string, mail: string) {
    return await test.step(`get verify link from mail server ${mail}`, async () => {
      const mailosaur = new MailosaurClient(apiKey);
      const criteria = {
        sentTo: mail + "@mailosaur.net",
        subject: "Please Confirm your Email"
        //body: "rabata.io/verify/email"
      }
      const email = await mailosaur.messages.get(mail, criteria,  { timeout: 60000});
      //const letter = email.html.links.find(el => el.href.includes("rabata.io/verify/email"));
      const letter = email.html.links[1];
      expect(letter, "Письмо с верификацией mail не найдено").toHaveProperty("href");
      expect(this.isValidUrl(letter.href), "Не удалось получить ссылку для проверки mail").toBe(true);
      return letter.href;
    });
  }
  async verifyMail(request: APIRequestContext, href: string) {
    await test.step(`open verify mail link ${href}`, async () => {
      const response = await request.get(href);
      expect(response.status(), "Не удалось перейти по ссылке с верификацией mail").toBe(200);
    });
  }
  
  async changeMailRequest(request: APIRequestContext, browser: Browser, newMail: string) {
    await test.step(`change user mail`, async () => {
      const sessionCookies = (await browser.contexts()[0].cookies()).filter(el =>(el.name == 'PHPSESSID'));
      const sessionId = `${sessionCookies[0].name}=${sessionCookies[0].value}`;
      const response = await request.put(`${process.env.BASE_URL}`+ "/api/user", { headers: {Cookie: sessionId}, data: {fullName: "andreypetrov", email: newMail + "@mailosaur.net"}});
      console.log(response.status());
      expect(response.status(), "Не удалось изменить mail пользователя").toBe(200);
    });
  }

  isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export const delay = ms => new Promise(r => setTimeout(r, ms));

export function getRandomInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}