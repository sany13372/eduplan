import { Page } from '@playwright/test';

import { Button } from '../locators/button';
import { MoreActions } from '../locators/more-actions';
import { Modal } from '../page-elements/modal/modal';
import { PeriodDrawer } from '../page-elements/drawer/plan/view/period.drawer';

import { UIKitLocators } from './common/UIKitLocators';
import { BasePage } from './common/base-page';

export class EduPlanViewPage extends BasePage {
  uiKit: UIKitLocators;

  baseURL: string;

  modal: Modal;

  periodDrawer: PeriodDrawer;

  constructor(page: Page, baseURL: string) {
    super(page);
    this.baseURL = baseURL;
    this.uiKit = new UIKitLocators(page);
    this.modal = new Modal(page);
    this.periodDrawer = new PeriodDrawer(page);
  }

  get iotTemplateTab(): Button {
    return new Button(this.page.locator('[role="tablist"] >> :text("Шаблоны ИОТ")'), 'Вкладка: Шаблоны ИОТ');
  }

  activityBlock(termNumber: number): Button {
    return new Button(
      this.page.locator(`[data-testid="eduGridElementBlock"]:has-text("${termNumber} семестр")`),
      `Блок «${termNumber} семестра»`,
    );
  }

  activityActionButton(termNumber: number): MoreActions {
    return new MoreActions(
      this.activityBlock(termNumber).getLocator.locator(
        '[data-testid="EDUKit.DropdownMenu.OpenNode"]:has-text("Действия")',
      ),
      `Кнопка «Действия» у «${termNumber} семестра»`,
    );
  }

  async open(): Promise<void> {
    await this.page.goto(`${this.baseURL}/eduplan/plan/epl_2Kb1TimnZGbvHcZCy3AiqX1z7og/view`);
  }
}
