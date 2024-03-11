import { test as _test } from "@playwright/test";
import { LoginPage } from "./classes/LoginPage.class";
import { CalculatorPage } from "./classes/CalculatorPage.class";
import { RegistrationPage } from "./classes/RegistrationPage.class";
import { MainPage } from "./classes/MainPage.class";
import { GlobalSetting } from "./classes/GlobalSettings.class";
import { Settings } from "./utils/types";


type Pages = {
  mainPage: MainPage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  calculatorPage: CalculatorPage;
  globalSetting: GlobalSetting;
  settings: Settings;
}

export const test = _test.extend<Pages>({
  globalSetting: async ({ settings }, use) => {
    await use(new GlobalSetting(settings));
  },
  mainPage: async ({ page, globalSetting }, use) => {
    await use(new MainPage(page, globalSetting));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  calculatorPage: async ({ page }, use) => {
    await use(new CalculatorPage(page));
  }
})