import { test as _test } from "@playwright/test";
import { LoginPage } from "./classes/LoginPage.class";
import { CalculatorPage } from "./classes/CalculatorPage.class";
import { RegistrationPage } from "./classes/RegistrationPage.class";


type Pages = {

  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  calcPage: CalculatorPage;
}

export const test = _test.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  calcPage: async ({ page }, use) => {
    await use(new CalculatorPage(page));
  }
})