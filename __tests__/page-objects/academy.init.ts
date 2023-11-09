import { Browser, BrowserContext, Page } from '@playwright/test';

import { BasePage } from './common/base-page';

export class AcademyInit extends BasePage {
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.context = context;
  }

  get currentPage(): Page {
    return this.page;
  }

  static async create(browser: Browser): Promise<AcademyInit> {
    const context = await browser.newContext();
    const page = await context.newPage();
    return new AcademyInit(page, context);
  }
}
