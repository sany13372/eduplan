import { Locator, test } from '@playwright/test';

import { BaseElement } from './base-element';

export class Block extends BaseElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(locator: Locator, name: string) {
    super(locator, name);
  }

  async getBlockValues(): Promise<string[]> {
    let getValues: string[];
    await test.step(`Получить значения блоков [${this.name}]`, async () => {
      getValues = await this.locator.allInnerTexts();
      getValues = getValues.map((x) => x.replace(/\n/g, ''));
    });
    // @ts-ignore
    return getValues;
  }
}
