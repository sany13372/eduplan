import { Locator, test } from '@playwright/test';

import { BaseElement } from './base-element';

export class MoreActions extends BaseElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(locator: Locator, name: string) {
    super(locator, name);
  }

  async chooseOption(option: string): Promise<void> {
    await test.step(`Выбрать в списке [${this.name}] значение ${option}`, async () => {
      await this.locator.click();
      await this.locator.locator(`../..//*[@data-analytics="UIKit.Dropable"] >> :text("${option}")`).click();
    });
  }

  async hoverOption(option: string): Promise<void> {
    await test.step(`Навести курсор на блок [${this.name}]`, async () => {
      await this.locator.click();
      await this.locator.locator(`../..//*[@data-analytics="UIKit.Dropable"] >> :text("${option}")`).hover();
    });
  }
}
