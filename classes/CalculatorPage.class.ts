import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';
import { getRandomInRange, roundTo10 } from './utils.class';
import defines from './defines';


export class CalculatorPage extends BasePage {

  RADIO_BASIC: Locator;
  RADIO_BACKUP: Locator;

  constructor(page: Page) {
    super(page);
    this.RADIO_BASIC = this.page.locator('[id="tariffBtn_0"]');
    this.RADIO_BACKUP = this.page.locator('[id="tariffBtn_1"]');
  }

  async openCalculator() {
    await test.step(`Open calculator page`, async () => {
      await this.openPage(`${process.env.BASE_URL}/#calculator`);
    });
  }

  async testFirstCalculatorMode() {
    const slider = this.page.locator('[id="dataApiStoredInput"]'),
      slider2 = this.page.locator('[id="dataDownloadInput"]'),
      final_sum = this.page.locator('p[id="rabataMobileApi"]'),
      value1 = getRandomInRange(1, 1000),
      value2 = getRandomInRange(1, 1000);

    await this.RADIO_BASIC.click();

    await slider.evaluate((slider: any, input_value: number) => {
      slider.value = input_value;
      slider.dispatchEvent(new Event('input', { 'bubbles': true }));
      slider.dispatchEvent(new Event('change', { 'bubbles': true }));
      return true;
    }, value1);

    await slider2.evaluate((slider: any, input_value: number) => {
      slider.value = input_value;
      slider.dispatchEvent(new Event('input', { 'bubbles': true }));
      slider.dispatchEvent(new Event('change', { 'bubbles': true }));
      return true;
    }, value2);


    const actual = +(await final_sum.innerText()).match(/\d+/g)[0],
      // прайс base_cost за гигабайт трафика, на форме слайдер в тб, плюс на 12 месяцев в году
      calculated = (value1 + value2) * 1000 * defines.tariff_1_price * 12;
    expect(actual, `вычисленное значение для первого тарифа: ${calculated} не соответствует значению в калькуляторе: ${actual}`).toEqual(calculated);
  }

  async testSecondCalculatorMode(value = getRandomInRange(1, 1000)) {
    const slider = this.page.locator('[id="dataStoredInput"]'),
      final_sum = this.page.locator('p[id="rabataMobile"]');
      //value = getRandomInRange(1, 1000),
    await this.RADIO_BACKUP.click();

    await slider.evaluate((slider: any, input_value: number) => {
      slider.value = input_value;
      slider.dispatchEvent(new Event('input', { 'bubbles': true }));
      slider.dispatchEvent(new Event('change', { 'bubbles': true }));
      return true;
    }, value);


    const actual = +(await final_sum.innerText()).match(/\d+/g)[0],
      // прайс base_cost за 10 тб трафика, плюс на 12 месяцев в году
    calculated = roundTo10(value) * defines.tariff_2_price * 12 / 10;
    expect.soft(actual, `вычисленное значение для трафика: ${value}TB по второму тарифу: ${calculated} не соответствует значению в калькуляторе: ${actual}`).toEqual(calculated);
  }


}
