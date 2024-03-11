import { test } from '../pom'
import defines from '../utils/defines';
import { changeMailRequest, delay, getMailLink, verifyMail } from '../utils/helper';


test.describe(`Rabata tests`, async () => {

  //Тест 1: Регистрация на сайте
  test("Registration test", async ({ registrationPage, request, loginPage, browser }) => {
    const mail = `${loginPage.mail}@mailosaur.net`;
    await registrationPage.registerAs(defines.reg_name, mail, defines.reg_password);
    const href = await getMailLink(defines.mail_api_key, loginPage.mail);
    await verifyMail(request, href);
    await loginPage.loginAs(mail, defines.reg_password);
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
    await calculatorPage.openCalculator();
    for await (let i of [11, 155, 256, 500, 999, 1000]) {
      await calculatorPage.testSecondCalculatorMode(i);
      for await (let j of [11, 155, 256, 500, 999, 1000]) {
        await calculatorPage.testFirstCalculatorMode(i, j);
      }
    }
  });
});




