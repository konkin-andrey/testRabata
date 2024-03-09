
import { expect } from '@playwright/test';
import { test } from '../pom'

test.describe(`Create copy`, async () => {


  test("Copy file owned by other user", async ({ registrationPage }) => {
    
    await registrationPage.registerAs();
    const delay = ms => new Promise(r => setTimeout(r, ms));
    //await delay(100001);
    //await loginPage.page.goto(`${process.env.BASE_URL}`);
  });

});

test.afterAll(async ({ request }) => {

});


