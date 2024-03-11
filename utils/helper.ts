import { APIRequestContext, Browser, Locator, expect, test } from "@playwright/test";
import MailosaurClient from "mailosaur";

export async function getMailLink(apiKey: string, server: string) {
  return await test.step(`get verify link from mail server ${server}`, async () => {
    const mailosaur = new MailosaurClient(apiKey);
    const criteria = {
      sentTo: server + "@mailosaur.net",
      subject: "Please Confirm your Email"
    }
    const email = await mailosaur.messages.get(server, criteria, { timeout: 60000 });
    await mailosaur.messages.deleteAll(server);
    const letter = email.html.links[1];
    expect(letter, "Письмо с верификацией mail не найдено").toHaveProperty("href");
    expect(isValidUrl(letter.href), "Не удалось получить ссылку для проверки mail").toBe(true);
    return letter.href;
  });
}

export async function verifyMail(request: APIRequestContext, href: string) {
  await test.step(`open verify mail link ${href}`, async () => {
    const response = await request.get(href);
    expect(response.status(), "Не удалось перейти по ссылке с верификацией mail").toBe(200);
  });
}

export async function changeMailRequest(request: APIRequestContext, browser: Browser, newMail: string) {
  await test.step(`change user mail`, async () => {
    const sessionCookies = (await browser.contexts()[0].cookies()).filter(el => (el.name == 'PHPSESSID'));
    const sessionId = `${sessionCookies[0].name}=${sessionCookies[0].value}`;
    const response = await request.put(`${process.env.BASE_URL}` + "/api/user", { headers: { Cookie: sessionId }, data: { fullName: "andreypetrov", email: newMail + "@mailosaur.net" } });
    expect(response.status(), `Не удалось изменить mail пользователя, статус ответа: ${response.status()}`).toBe(200);
  });
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}


export const delay = ms => new Promise(r => setTimeout(r, ms));

export function getRandomInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// частичный костыль с выставлением значения в слайдер с диспатчем эвентов
export const pathcSliderValue = async (slider: Locator, value: number) =>
  await slider.evaluate((slider: any, input_value: number) => {
    slider.value = input_value;
    slider.dispatchEvent(new Event('input', { 'bubbles': true }));
    slider.dispatchEvent(new Event('change', { 'bubbles': true }));
    return true;
  }, value);