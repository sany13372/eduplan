import { Locator, test } from '@playwright/test';

import { BaseElement } from './base-element';

export class Input extends BaseElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(locator: Locator, name: string) {
    super(locator, name);
  }

  async fill(text: string): Promise<void> {
    await test.step(`Заполнить поле [${this.name}] текстом "${text}"`, async () => {
      await this.locator.fill(text);
    });
  }

  async manualFill(text: string): Promise<void> {
    await test.step(`Заполнить поле [${this.name}] текстом "${text}"`, async () => {
      await this.locator.click();
      await this.locator.page().keyboard.press('Meta+A');
      await this.locator.page().keyboard.press('Backspace');
      await this.locator.page().keyboard.press('Control+A');
      await this.locator.page().keyboard.press('Backspace');
      await this.locator.page().keyboard.press('Home');
      await this.locator.type(text);
    });
  }

  async fillHighlighted(text: string): Promise<void> {
    await test.step(`Выделить и заполнить поле [${this.name}] текстом "${text}"`, async () => {
      await this.locator.click();
      await this.locator.page().keyboard.press('Control+A');
      await this.locator.page().keyboard.press('Meta+A');
      await this.locator.type(text);
    });
  }

  async type(text: string): Promise<void> {
    await test.step(`Заполнить поле [${this.name}] текстом "${text}" эмулируя нажатия клавиш клавиатуры`, async () => {
      await this.locator.type(text);
    });
  }

  // Для ввода пути до файли, в инпут загрузки
  async setInputFiles(pathToFile: string): Promise<void> {
    await test.step(`Загрузить файл по нажатию на [${this.name}]`, async () => {
      await this.locator.setInputFiles(pathToFile);
    });
  }

  // Для подтверждения ввода в поле
  async pressEnter(): Promise<void> {
    await test.step(`Нажать Enter в поле [${this.name}]`, async () => {
      await this.locator.click();
      await this.locator.page().keyboard.press('Enter');
    });
  }
}
