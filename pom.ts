import { test as _test } from "@playwright/test";
import { LoginPage } from "./classes/LoginPage.class";
import { RegistrationPage } from "./classes/RegistrationPage.class";


type Pages = {

  loginPage: LoginPage;
  registrationPage: RegistrationPage;
}

export const test = _test.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  }
})