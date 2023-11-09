import { Page } from '@playwright/test';

import { CommonDrawer } from '../common.drawer';
import { Select } from '../../../locators/select';
import { Button } from '../../../locators/button';

export class LessonDrawer extends CommonDrawer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(page: Page) {
    super(page);
  }

  get eduKindSelect(): Select {
    return new Select(this.page.locator('[data-testid="eduKind-container"]'), 'Вид занятия');
  }

  get eduKindDisabledButton(): Button {
    return new Button(
      this.eduKindSelect.getLocator.locator('button'),
      'Получить атрибут «disabled» у поля «Вид занятия»',
    );
  }
}
