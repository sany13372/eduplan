import { Page, test } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async reload(): Promise<void> {
    await test.step(`Перезагрузить страницу`, async () => {
      await this.page.reload();
    });
  }

  async clearCookies(): Promise<void> {
    await test.step(`Очистить Cookies страницы`, async () => {
      await this.page.context().clearCookies();
    });
  }

  async setViewportBlockSize(): Promise<void> {
    const { height, width } = await this.page.evaluate(async () => {
      const page = document.querySelector('[class*="main-container"]');
      return { height: page!.clientHeight, width: page!.clientWidth };
    });
    await this.page.setViewportSize({ width, height });
  }
}
