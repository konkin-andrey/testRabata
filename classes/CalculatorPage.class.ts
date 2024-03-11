import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';
import { getRandomInRange, pathcSliderValue } from '../utils/helper';
import defines from '../utils/defines';


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

  async testFirstCalculatorMode(value1 = getRandomInRange(1, 1000), value2 = getRandomInRange(1, 1000)) {
    await test.step(`test first tariff with values ${value1} ${value2}`, async () => {
      const slider = this.page.locator('[id="dataApiStoredInput"]'),
        slider2 = this.page.locator('[id="dataDownloadInput"]'),
        final_sum = this.page.locator('p[id="rabataMobileApi"]');
      await this.RADIO_BASIC.click();
      await pathcSliderValue(slider, value1);
      await pathcSliderValue(slider2, value2);
      const actual = +(await final_sum.innerText()).match(/\d+/g)[0],
        calculated = (value1 + value2) * 1000 * defines.tariff_1_price * 12;
      expect(actual, `вычисленное значение для первого тарифа: ${calculated} для параметров ${value1} ${value2} не соответствует значению в калькуляторе: ${actual}`).toEqual(calculated);
    });
  }

  async testSecondCalculatorMode(value = getRandomInRange(1, 1000)) {
    await test.step(`test second tariff with value ${value}`, async () => {
      const slider = this.page.locator('[id="dataStoredInput"]'),
        final_sum = this.page.locator('p[id="rabataMobile"]');
      await this.RADIO_BACKUP.click();
      await pathcSliderValue(slider, value);
      const actual = +(await final_sum.innerText()).match(/\d+/g)[0],
        calculated = Math.ceil(value / 10) * defines.tariff_2_price * 12;
      expect.soft(actual, `вычисленное значение для трафика: ${value}TB по второму тарифу: ${calculated} не соответствует значению в калькуляторе: ${actual}`).toEqual(calculated);
    });
  }
}
