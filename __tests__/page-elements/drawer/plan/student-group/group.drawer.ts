import { Page } from '@playwright/test';

import { CommonDrawer } from '../../common.drawer';
import { Select } from '../../../../locators/select';

export class GroupDrawer extends CommonDrawer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(page: Page) {
    super(page);
  }

  get showGroupTypeSelect(): Select {
    return new Select(this.drawer.locator('[data-testid="groupType-container"]'), 'Тип группы');
  }
}
