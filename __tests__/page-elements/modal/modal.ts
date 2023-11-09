import { Locator, Page } from '@playwright/test';

import { Button } from '../../locators/button';
import { Block } from '../../locators/block';
import { BasePage } from '../../page-objects/common/base-page';

export class Modal extends BasePage {
  private modal: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = this.page.locator('[data-testid="EDUKit.Modal.Container"]');
  }

  get block(): Block {
    return new Block(this.modal, 'Модальное окно');
  }

  get closeButton(): Button {
    return new Button(
      this.modal.locator(`[data-testid="EDUKit.Modal.Container.CloseButton"]`),
      'Крестик в модальном окне',
    );
  }

  get excludeButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Исключить")`), `Исключить`);
  }

  get stayButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Остаться")`), `Остаться`);
  }

  get cancelButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Отмена")`), `Отмена`);
  }

  get leaveButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Да,покинуть")`), `Да,покинуть`);
  }

  get exitButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Да, выйти")`), `Да, выйти`);
  }

  get yesCloseButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Да, закрыть")`), `Да, закрыть`);
  }

  get removeButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Удалить")`), `Удалить`);
  }

  get okayButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Ок")`), `Ок`);
  }

  get yesContinueButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Да,продолжить")`), `Да,продолжить`);
  }

  get noThanksButton(): Button {
    return new Button(this.modal.locator(`button >> :text("Нет, спасибо")`), `Нет, спасибо`);
  }

  headerBlock(header: string): Button {
    return new Button(this.modal.locator(`h3:text("${header}")`), `${header}`);
  }

  textBlock(text: string): Button {
    return new Button(this.modal.locator(`p:text("${text}")`), `${text}`);
  }
}
