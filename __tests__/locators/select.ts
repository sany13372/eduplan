import { Locator, test } from '@playwright/test';

import { BaseElement } from './base-element';

export class Select extends BaseElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(locator: Locator, name: string) {
    super(locator, name);
  }

  async expandOptions(log = true): Promise<void> {
    if (!log) {
      await this.locator.click();
      return;
    }
    await test.step(`Раскрыть список [${this.name}]`, async () => {
      await this.locator.click();
    });
  }

  async chooseOption(option: string | null): Promise<void> {
    await test.step(`Выбрать в списке [${this.name}] значение ${option}`, async () => {
      await this.locator.click();
      await this.locator.locator(`//..//*[text()="${option}"]`).click();
    });
  }
}
