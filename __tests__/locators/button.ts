import { Locator, test } from '@playwright/test';

import { BaseElement } from './base-element';

export class Button extends BaseElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(locator: Locator, name: string) {
    super(locator, name);
  }

  async click(log = true): Promise<void> {
    if (!log) {
      await this.locator.click();
      return;
    }
    await test.step(`Нажать на кнопку [${this.name}]`, async () => {
      await this.locator.click({ timeout: 9000 });
    });
  }

  async forceClick(): Promise<void> {
    await test.step(`Нажать на кнопку [${this.name}] принудительно`, async () => {
      await this.locator.click({ force: true });
    });
  }
}
