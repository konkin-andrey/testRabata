import { test } from '../pom'
import defines from '../utils/defines';
import { changeMailRequest, getMailLink, verifyMail } from '../utils/utils';


test.describe(`Rabata tests`, async () => {
  //Тест 1: Регистрация на сайте
  test("Registration test", async ({ registrationPage, request, loginPage, browser }) => {
    await registrationPage.registerAs(defines.reg_name, defines.reg_mail, defines.reg_password);
    const href = await getMailLink(defines.mail_api_key, defines.mail_server);
    await verifyMail(request, href);
    await loginPage.loginAs(defines.reg_mail, defines.reg_password);
    //Замена почты зарегистрированного пользователя для повторной регистрации нового пользователя под старой почтой
    await changeMailRequest(request, browser, String(Math.random()));
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

  //Тест 4: Проверка работы калькулятора 'Total Data Stored' и 'Monthly'
  test("Check calculation price", async ({ calculatorPage }) => {
    await test.step('first calculator', async () => {
      await calculatorPage.openCalculator();
    })


    await test.step('second calculator', async () => {
      await calculatorPage.testFirstCalculatorMode();
      await calculatorPage.testFirstCalculatorMode();
      await calculatorPage.testFirstCalculatorMode();
      
      await calculatorPage.testSecondCalculatorMode(1);
      await calculatorPage.testSecondCalculatorMode(91);
      await calculatorPage.testSecondCalculatorMode(96);
      await calculatorPage.testSecondCalculatorMode(543);
      await calculatorPage.testSecondCalculatorMode(655);
      await calculatorPage.testSecondCalculatorMode(500);
      await calculatorPage.testSecondCalculatorMode(999);
      await calculatorPage.testSecondCalculatorMode(1000);
    })
  });

});


test.afterAll(async ({ request, browser }) => {

});




