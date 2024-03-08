import { test as _test } from "@playwright/test";
import { LoginPage } from "./classes/LoginPage.class";


type Pages = {

  loginPage: LoginPage;
}

export const test = _test.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
})