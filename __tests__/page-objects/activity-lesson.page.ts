import { Page } from '@playwright/test';

import { Button } from '../locators/button';
import { Block } from '../locators/block';
import { MoreActions } from '../locators/more-actions';
import { Table } from '../locators/table';
import { Modal } from '../page-elements/modal/modal';
import { LessonDrawer } from '../page-elements/drawer/activity/lesson.drawer';

import { UIKitLocators } from './common/UIKitLocators';
import { BasePage } from './common/base-page';

export class ActivityLessonPage extends BasePage {
  uiKit: UIKitLocators;

  baseURL: string;

  modal: Modal;

  lessonDrawer: LessonDrawer;

  constructor(page: Page, baseURL: string) {
    super(page);
    this.baseURL = baseURL;
    this.uiKit = new UIKitLocators(page);
    this.modal = new Modal(page);
    this.lessonDrawer = new LessonDrawer(page);
  }

  get lessonHeaderStub(): Block {
    return new Block(
      this.page.locator('h1', { hasText: 'Создание занятий невозможно' }),
      'Заглушка «Создание занятий невозможно»',
    );
  }

  get lessonForm(): Block {
    return new Block(this.page.locator('[data-testid="lessonForm"]'), 'Форма вкладки «Занятия»');
  }

  get lessonTextStub(): Block {
    return new Block(
      this.page.locator('p', { hasText: 'Для создания занятия сначала добавьте тему во вкладке «Структура и темы»' }),
      'Заглушка «Для создания занятия сначала добавьте тему во вкладке «Структура и темы»',
    );
  }

  themeBlock(themeTitle: string): Block {
    return new Block(this.page.locator(`[data-testid="themeBlock"]:has-text("${themeTitle}")`), `Тема «${themeTitle}»`);
  }

  lessonBlock(themeTitle: string, lessonTitle: string): Button {
    return new Button(
      this.themeBlock(themeTitle).getLocator.locator(`[data-testid="lessonBlock"]:has-text("${lessonTitle}")`),
      `Занятие «${lessonTitle}» у темы «${themeTitle}»`,
    );
  }

  lessonInfoBlock(themeTitle: string, lessonTitle: string): Table {
    return new Table(
      this.lessonBlock(themeTitle, lessonTitle).getLocator.locator('span'),
      'Получить информацию о занятие',
    );
  }

  lessonSettingSelect(themeTitle: string, lessonTitle: string): MoreActions {
    return new MoreActions(
      this.lessonBlock(themeTitle, lessonTitle).getLocator.locator('[data-testid="EDUKit.DropdownMenu.OpenNode"]'),
      `Настройки занятия «${lessonTitle}»`,
    );
  }

  addLessonButton(themeTitle: string): Button {
    return new Button(
      this.themeBlock(themeTitle).getLocator.locator('button:has-text("Добавить занятие")'),
      `Добавить занятие у темы «${themeTitle}»`,
    );
  }

  themeAccordionButton(themeTitle: string): Button {
    return new Button(
      this.themeBlock(themeTitle).getLocator.locator('[data-icon-name="master-chevron-down"]'),
      `Раскрыть аккордеон темы «${themeTitle}»`,
    );
  }

  themeStubBlock(themeTitle: string): Block {
    return new Block(
      this.themeBlock(themeTitle).getLocator.locator(
        ':text("Чтобы добавить первое занятие в тему, нажмите на кнопку «Добавить занятие»")',
      ),
      `Заглушка при отсутствие занятий у темы «${themeTitle}»`,
    );
  }

  async openLesson(): Promise<void> {
    await this.page.goto(
      `${this.baseURL}/eduplan/plan/epl_2Rbp8yoAlOapj6MI7znUemTmVMy/activity/eplr_2RvyDUgHPtwyhWb7QYU0HR9HoqK/lesson/view`,
    );
  }
}
