
import { expect } from '@playwright/test';
import { test } from '../pom'
import { Utils, delay } from '../classes/utils.class'
test.describe(`Create copy`, async () => {


  test.skip("Copy file owned by other user123", async ({ loginPage }) => {
    await loginPage.loginAs(`gz8cvbhj@mailosaur.net`, `I_see_dead_people_97`);
    await delay(100001);
    //await loginPage.page.goto(`${process.env.BASE_URL}`);
  });

  test("Copy file owned by other user", async ({ registrationPage, request, loginPage, browser }) => {
    //await registrationPage.registerAs("andreypetrov", "gz8cvbhj@mailosaur.net", "I_see_dead_people_97");
    const utils = new Utils();
    const href = await utils.getMailLink("m3bNfJzWxKxVKGxWskpVvXMUCcTMWy21", "gz8cvbhj");
    await utils.verifyMail(request, href);
    await loginPage.loginAs(`gz8cvbhj@mailosaur.net`, `I_see_dead_people_97`);
    await utils.changeMailRequest(request, browser, String(Math.random()));
    console.log("test complite");
  });

});

test.skip("cacl", async ({ calcPage }) => {

  await calcPage.openCalculator();

  // calcPage.RADIO_BACKUP.click();
  await calcPage.testFirstCalculatorMode();
  await calcPage.testSecondCalculatorMode();

  await delay(100000);

});

test.afterAll(async ({ request }) => {

});




