import { Page } from '@playwright/test';

import { Switch } from '../locators/switch';
import { Button } from '../locators/button';
import { Block } from '../locators/block';
import { Select } from '../locators/select';
import { Modal } from '../page-elements/modal/modal';
import { StudentDrawer } from '../page-elements/drawer/plan/student-group/student.drawer';
import { GroupDrawer } from '../page-elements/drawer/plan/student-group/group.drawer';

import { UIKitLocators } from './common/UIKitLocators';
import { BasePage } from './common/base-page';

export class EduPlanStudentsGroupPage extends BasePage {
  uiKit: UIKitLocators;

  studentDrawer: StudentDrawer;

  groupDrawer: GroupDrawer;

  modal: Modal;

  baseURL: string;

  constructor(page: Page, baseURL: string) {
    super(page);
    this.baseURL = baseURL;
    this.uiKit = new UIKitLocators(page);
    this.studentDrawer = new StudentDrawer(page);
    this.groupDrawer = new GroupDrawer(page);
    this.modal = new Modal(page);
  }

  get backToStudentsButton(): Button {
    return new Button(this.page.locator('span', { hasText: 'К обучающимся' }), 'К обучающимся');
  }

  get selectFromListButton(): Button {
    return new Button(this.page.locator('button:has-text("Выбрать из списка")'), 'Выбрать из списка');
  }

  get addNewButton(): Button {
    return new Button(this.page.locator('button:has-text("Добавить нового")'), 'Добавить нового');
  }

  get editGroupButton(): Button {
    return new Button(this.page.locator('button:has-text("Редактировать группу")'), 'Редактировать группу');
  }

  get deleteGroupButton(): Button {
    return new Button(this.page.locator('button:has-text("Удалить группу")'), 'Удалить группу');
  }

  studentCardBlock(fullName: string): Block {
    return new Block(
      this.page.locator(`[data-testid="studentCard"]:has-text("${fullName}")`),
      `Блок обучающегося «${fullName}»`,
    );
  }

  chooseStudentSwitch(fullName: string): Switch {
    return new Switch(
      this.studentCardBlock(fullName).getLocator.locator(`[data-testid="checkedStudents"]`),
      `Выбрать студента «${fullName}»`,
    );
  }

  programBlock(title: string): Block {
    return new Block(
      this.page.locator(`[data-testid="infoCard"]:has-text("Образовательная программа"):has-text("${title}")`),
      `Карточка пространства имеет «${title}»`,
    );
  }

  planBlock(title: string): Block {
    return new Block(
      this.page.locator(`[data-testid="infoCard"]:has-text("План обучения"):has-text("${title}")`),
      `Карточка плана имеет «${title}»`,
    );
  }

  groupTypeBlock(title: string): Block {
    return new Block(
      this.page.locator(`[data-testid="infoCard"]:has-text("Тип группы"):has-text("${title}")`),
      `Карточка типа группы имеет «${title}»`,
    );
  }

  eduFormBlock(title: string): Block {
    return new Block(
      this.page.locator(`[data-testid="infoCard"]:has-text("Форма обучения"):has-text("${title}")`),
      `Карточка формы обучения имеет «${title}»`,
    );
  }

  competitionPeriodBlock(title: string): Block {
    return new Block(
      this.page.locator(`[data-testid="infoCard"]:has-text("Срок освоения"):has-text("${title}")`),
      `Карточка срока освоения имеет «${title}»`,
    );
  }

  yearBlock(title: string): Block {
    return new Block(
      this.page.locator(`[data-testid="infoCard"]:has-text("Год набора"):has-text("${title}")`),
      `Карточка года набора имеет «${title}»`,
    );
  }

  startDateBlock(title: string): Block {
    return new Block(
      this.page.locator(`[data-testid="infoCard"]:has-text("Дата начала обучения"):has-text("${title}")`),
      `Карточка даты начала обучения имеет «${title}»`,
    );
  }

  studentActionSelect(fullName: string): Select {
    return new Select(
      this.studentCardBlock(fullName).getLocator.locator(`[data-testid="EDUKit.DropdownMenu.OpenNode"]`),
      `Раскрыть меню действий у студента «${fullName}»`,
    );
  }

  studyCountBlock(count: number): Block {
    return new Block(
      this.page.locator(`[data-testid="studyCount"]:has-text("${count}")`),
      `Количество обучающихся «${count}»`,
    );
  }

  studentInfoBlock(fullName: string, text: string): Block {
    return new Block(
      this.studentCardBlock(fullName).getLocator.locator(`:text("${text}")`),
      `Студент «${fullName}» имеет «${text}»`,
    );
  }

  async open(): Promise<void> {
    await this.page.goto(
      `${this.baseURL}/eduplan/plan/epl_2Kb1TimnZGbvHcZCy3AiqX1z7og/group/stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a/view`,
    );
  }
}
