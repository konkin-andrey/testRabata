import { test } from '../pom'
import defines from '../utils/defines';
import { changeMailRequest, getMailLink, verifyMail } from '../utils/helper';


test.describe(`Rabata tests`, async () => {


  //Тест 1: Регистрация на сайте
  test("Registration test", async ({ registrationPage, request, loginPage, browser }) => {
    await registrationPage.registerAs(defines.reg_name, defines.reg_mail, defines.reg_password);
    const mail = loginPage.mail,
      href = await getMailLink(defines.mail_api_key, mail);

    await verifyMail(request, href);
    await loginPage.loginAs(defines.reg_mail, defines.reg_password);
    //Замена почты зарегистрированного пользователя для повторной регистрации нового пользователя под старой почтой
    await changeMailRequest(request, browser, String(Math.random()));
  });

  //Тест 2: Проверка 'Try it for free'
  test.skip("Check 'Try it for free' btns", async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.checkTryItForFreeBtn(0);
    await mainPage.openMainPage();
    await mainPage.checkTryItForFreeBtn(1);
  });

  //Тест 3: Проверка Privacy policy
  test.skip("Check Privacy policy", async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.checkPrivacyPolicy();
  });

  //Тест 4: Проверка работы калькулятора 'Total Data Stored' и 'Monthly'
  test.skip("Check calculation price", async ({ calculatorPage }) => {
    await calculatorPage.openCalculator();
    for (let i of [11, 155, 256, 500, 999, 1000]) {
      await calculatorPage.testSecondCalculatorMode(i);
      for (let j of [11, 155, 256, 500, 999, 1000]) {
        await calculatorPage.testFirstCalculatorMode(i, j);
      }
    }
  });
});




