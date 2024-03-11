import { test as _test } from "@playwright/test";
import { LoginPage } from "./classes/LoginPage.class";
import { CalculatorPage } from "./classes/CalculatorPage.class";
import { RegistrationPage } from "./classes/RegistrationPage.class";
import { MainPage } from "./classes/MainPage.class";
import { Settings } from "./utils/types";

type Pages = {
  mainPage: MainPage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  calculatorPage: CalculatorPage;
  settings: Settings;
}

export const test = _test.extend<Pages>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  loginPage: async ({ page, settings }, use) => {
    await use(new LoginPage(page, settings));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  calculatorPage: async ({ page }, use) => {
    await use(new CalculatorPage(page));
  },
  settings: [[], { option: true }] as any,
})