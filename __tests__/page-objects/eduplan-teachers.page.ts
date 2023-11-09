import { Page } from '@playwright/test';

import { Button } from '../locators/button';
import { Block } from '../locators/block';
import { Modal } from '../page-elements/modal/modal';

import { UIKitLocators } from './common/UIKitLocators';
import { BasePage } from './common/base-page';

export class EduPlanTeachersPage extends BasePage {
  uiKit: UIKitLocators;

  baseURL: string;

  modal: Modal;

  constructor(page: Page, baseURL: string) {
    super(page);
    this.baseURL = baseURL;
    this.uiKit = new UIKitLocators(page);
    this.modal = new Modal(page);
  }

  get alertAddingTeacherBlock(): Block {
    return new Block(
      this.page.locator('[role="alert"] >> :text("Список преподавателей успешно обновлён.")'),
      'Список преподавателей успешно обновлён.',
    );
  }

  get teachersForm(): Block {
    return new Block(this.page.locator('[data-testid="teachersForm"]'), 'Форма «Преподаватели»');
  }

  get addingTeachersWidget(): Block {
    return new Block(this.page.locator('[data-testid="addingTeachersWidget"]'), 'Виджет «Добавление преподавателей»');
  }

  get addingTeachersWidgetCancelButton(): Button {
    return new Button(
      this.addingTeachersWidget.getLocator.getByText('Отмена'),
      'Кнопка «Отмена» в виджете «Добавление преподавателей»',
    );
  }

  get addingTeachersWidgetCrossButton(): Button {
    return new Button(
      this.addingTeachersWidget.getLocator.locator('[data-icon-name="master-math-multiplication"]'),
      'Кнопка «Х (крестик)» в виджете «Добавление преподавателей»',
    );
  }

  get teacherHeaderStub(): Block {
    return new Block(
      this.page.locator('h1', { hasText: 'В образовательное пространство ещё не добавлены преподаватели' }),
      'Заглушка «В образовательное пространство ещё не добавлены преподаватели»',
    );
  }

  get teacherTextStub(): Block {
    return new Block(
      this.page.locator('p', { hasText: 'Настройка списка преподавателей мероприятий плана обучения невозможна' }),
      'Заглушка «Настройка списка преподавателей мероприятий плана обучения невозможна»',
    );
  }

  activityBlock(activity: string): Button {
    return new Button(
      this.page.locator(`[data-testid="activityBlock"]:has-text("${activity}")`),
      `Мероприятие «${activity}»`,
    );
  }

  addTeacher(activity: string): Button {
    return new Button(
      this.activityBlock(activity).getLocator.locator(`span:text("Добавить")`),
      `Добавить преподавателя в мероприятие «${activity}»`,
    );
  }

  addTeacherFromList(email: string): Button {
    return new Button(
      this.page.locator(
        `[data-testid="selectTeacherWidget"]:has-text("${email}") >> [data-testid="EDUKit.Checkbox.Label"]`,
      ),
      `Выбрать преподователя из списка`,
    );
  }

  teacherCardBlock(activity: string, email: string): Block {
    return new Block(
      this.activityBlock(activity).getLocator.locator(`[data-testid="teacherInfoCard"]:has-text("${email}")`),
      `Карточка преподавателя «${email}» в мероприятие «${activity}»`,
    );
  }

  deleteTeacher(activity: string, email: string): Button {
    return new Button(
      this.activityBlock(activity).getLocator.locator(
        `[data-testid="teacherInfoCard"]:has-text("${email}") >> [aria-label="Открепить преподавателя"]`,
      ),
      `Удалить преподавателя ${email} в мероприятие «${activity}»`,
    );
  }

  async openEduPlanTeachers(): Promise<void> {
    await this.page.goto(`${this.baseURL}/eduplan/plan/epl_2Kb1TimnZGbvHcZCy3AiqX1z7og/teachers`);
  }
}
