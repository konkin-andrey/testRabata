
import { expect } from '@playwright/test';
import { test } from '../pom'

test.describe(`Create copy`, async () => {


  test("Copy file owned by other user", async ({ loginPage }) => {
    loginPage.loginAs();
    console.log(123);
  });

});

test.afterAll(async ({ request }) => {

});