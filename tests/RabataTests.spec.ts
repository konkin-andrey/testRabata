import { test } from '../pom'
import { Utils } from '../classes/utils.class'
import defines from '../classes/defines';
test.describe(`Rabata tests`, async () => {

  //Тест 1: Регистрация на сайте
  test("Registration test", async ({ registrationPage, request, loginPage, browser }) => {
    await registrationPage.registerAs(defines.reg_name, defines.reg_mail, defines.reg_password);
    const utils = new Utils();
    const href = await utils.getMailLink(defines.mail_api_key, defines.mail_server);
    await utils.verifyMail(request, href);
    await loginPage.loginAs(defines.reg_mail, defines.reg_password);
    //Замена почты зарегистрированного пользователя для повторной регистрации нового пользователя под старой почтой
    await utils.changeMailRequest(request, browser, String(Math.random()));
  });

  //Тест 2: Проверка 'Try it for free'
  test("Check 'Try it for free' btns", async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.checkTryItForFreeBtn(0);
    await mainPage.openMainPage();
    await mainPage.checkTryItForFreeBtn(1);
  });

  //Тест 3: Проверка Privacy policy
  test("Check Privacy policy", async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.checkPrivacyPolicy();
  });
});

//Тест 4: Проверка работы калькулятора 'Total Data Stored' и 'Monthly'
test("Check calculation price", async ({ calcPage }) => {
  await calcPage.openCalculator();
  await calcPage.testFirstCalculatorMode();
  await calcPage.testSecondCalculatorMode(1);
  await calcPage.testSecondCalculatorMode(91);
  await calcPage.testSecondCalculatorMode(96);
  await calcPage.testSecondCalculatorMode(543);
  await calcPage.testSecondCalculatorMode(655);
  await calcPage.testSecondCalculatorMode(500);
  await calcPage.testSecondCalculatorMode(999);
  await calcPage.testSecondCalculatorMode(1000);
  
});

test.afterAll(async ({ request, browser }) => {

});




