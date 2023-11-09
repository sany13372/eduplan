import { Locator, Page } from '@playwright/test';

import { Button } from '../../locators/button';
import { Block } from '../../locators/block';
import { Input } from '../../locators/input';
import { BasePage } from '../../page-objects/common/base-page';

export class CommonDrawer extends BasePage {
  protected drawer: Locator;

  constructor(page: Page) {
    super(page);
    this.drawer = this.page.locator('aside');
  }

  get addButton(): Button {
    return new Button(this.drawer.locator('span', { hasText: 'Добавить' }), 'Добавить');
  }

  get saveButton(): Button {
    return new Button(this.drawer.locator('button', { hasText: 'Сохранить' }), 'Сохранить');
  }

  get titleField(): Input {
    return new Input(this.drawer.locator('[data-testid="title"]'), 'Название');
  }

  get closeIconButton(): Button {
    return new Button(this.drawer.locator('[data-icon-name="master-close"]').last(), 'Крестик');
  }

  get cancelButton(): Button {
    return new Button(this.drawer.locator('button', { hasText: 'Отмена' }), 'Отмена');
  }

  get cancel2Button(): Button {
    return new Button(this.drawer.locator('button', { hasText: 'Отменить' }), 'Отменить');
  }

  get searchByFullNameField(): Input {
    return new Input(this.drawer.getByPlaceholder('Поиск по ФИО'), 'Поиск по ФИО');
  }

  headerBlock(header: string): Block {
    return new Block(this.drawer.locator(`h2:has-text("${header}")`), `Заголовок «${header}» в выпающем окне`);
  }

  textBlock(text: string): Block {
    return new Block(this.drawer.locator(`:text("${text}")`), `Текст «${text}» в выпающем окне`);
  }
}
