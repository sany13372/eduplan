import { Page } from '@playwright/test';

import { Button } from '../../locators/button';
import { Block } from '../../locators/block';
import { Input } from '../../locators/input';
import { Switch } from '../../locators/switch';

import { BasePage } from './base-page';

export class UIKitLocators extends BasePage {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(page: Page) {
    super(page);
  }

  get addButton(): Button {
    return new Button(this.page.locator('span', { hasText: 'Добавить' }), 'Добавить');
  }

  get cancelButton(): Button {
    return new Button(this.page.getByText('Отмена'), 'Отмена');
  }

  get cancel2Button(): Button {
    return new Button(this.page.getByText('Отменить'), 'Отменить');
  }

  get titleField(): Input {
    return new Input(this.page.locator('#title'), 'Полное название');
  }

  toastBlock(name = 'Данные успешно обновлены'): Block {
    return new Block(this.page.locator(`[data-testid="EDUKit.Toast"] >> :text("${name}")`).first(), `Тост «${name}»`);
  }

  get saveButton(): Button {
    return new Button(this.page.locator('span', { hasText: 'Сохранить' }), 'Сохранить');
  }

  get editButton(): Button {
    return new Button(this.page.locator('span', { hasText: 'Редактировать' }), 'Редактировать');
  }

  get labelCheckbox(): Switch {
    return new Switch(this.page.locator(`[data-testid="EDUKit.Checkbox.Label"]`), 'Компонент «Чекбокс»');
  }

  get climbUpButton(): Button {
    return new Button(this.page.locator(`[data-icon-name="master-arrow-up"]`), 'Подняться наверх');
  }

  textLabel(text: string): Button {
    return new Button(this.page.locator(`//*[text()="${text}"]`), `Текст: "${text}"`);
  }

  headerH1Block(header: string): Block {
    return new Block(this.page.locator('h1', { hasText: `${header}` }), `Заголовок H1: "${header}"`);
  }

  headerH2Block(header: string): Block {
    return new Block(this.page.locator('h2', { hasText: `${header}` }), `Заголовок H2: "${header}"`);
  }

  headerH3Block(header: string): Block {
    return new Block(this.page.locator('h3', { hasText: `${header}` }), `Подзаголовок H3: "${header}"`);
  }

  headerH4Block(header: string): Block {
    return new Block(this.page.locator('h4', { hasText: `${header}` }), `Подзаголовок H4: "${header}"`);
  }

  fieldBlock(fieldName: string, value: string | null): Block {
    return new Block(
      this.page.locator(
        `//*[text()="${fieldName}"]//../..//*[contains(text(), "${value}")] | //p[text()="${fieldName}"]/../..//*[contains(@value, "${value}")]`,
      ),
      `Значение «${value}» у поля «${fieldName}»`,
    );
  }
}
