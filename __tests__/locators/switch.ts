import { expect, Locator, test } from '@playwright/test';

import { BaseElement } from './base-element';

export class Switch extends BaseElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(locator: Locator, name: string) {
    super(locator, name);
  }

  getState(): Promise<boolean> {
    return this.locator.locator('input').isChecked();
  }

  async clickOnAll(): Promise<void> {
    await test.step(`Нажать на все переключатели`, async () => {
      const count = await this.locator.count();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < count; i++) {
        // eslint-disable-next-line no-await-in-loop
        await this.locator.nth(i).click();
      }
    });
  }

  async click(state?: boolean): Promise<void> {
    await test.step(`Нажать на переключатель [${this.name}]`, async () => {
      await this.locator.click();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      state ? expect(await this.getState()).toEqual(state) : false;
    });
  }
}
