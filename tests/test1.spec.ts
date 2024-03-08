
import { expect } from '@playwright/test';
import { test } from '../pom'

test.describe(`Create copy`, async () => {


  test("Copy file owned by other user", async ({ loginPage }) => {
    
    loginPage.loginAs();

    //await loginPage.page.goto(`${process.env.BASE_URL}`);
  });

});

test.afterAll(async ({ request }) => {

});


