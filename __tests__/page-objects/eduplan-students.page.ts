import { Page } from '@playwright/test';

import { MoreActions } from '../locators/more-actions';
import { Button } from '../locators/button';
import { Block } from '../locators/block';
import { Select } from '../locators/select';
import { Input } from '../locators/input';
import { Modal } from '../page-elements/modal/modal';
import { StudentDrawer } from '../page-elements/drawer/plan/student-group/student.drawer';
import { GroupDrawer } from '../page-elements/drawer/plan/student-group/group.drawer';
import { ChoseStudentsDrawer } from '../page-elements/drawer/plan/student-group/chose-students.drawer';

import { UIKitLocators } from './common/UIKitLocators';
import { BasePage } from './common/base-page';

export class EduPlanStudentsPage extends BasePage {
  uiKit: UIKitLocators;

  studentDrawer: StudentDrawer;

  choseStudentsDrawer: ChoseStudentsDrawer;

  groupDrawer: GroupDrawer;

  modal: Modal;

  baseURL: string;

  constructor(page: Page, baseURL: string) {
    super(page);
    this.baseURL = baseURL;
    this.uiKit = new UIKitLocators(page);
    this.studentDrawer = new StudentDrawer(page);
    this.choseStudentsDrawer = new ChoseStudentsDrawer(page);
    this.groupDrawer = new GroupDrawer(page);
    this.modal = new Modal(page);
  }

  get actionSelect(): Select {
    return new Select(this.page.locator('[data-testid="addStudentGroupMenu"]'), 'Действия');
  }

  get filterByGroupSelect(): Select {
    return new Select(this.page.locator('[data-testid="filterByGroup"]'), 'Фильтрация по группам');
  }

  get countGroupBlock(): Block {
    return new Block(this.page.locator(`[data-testid="groupBlock"]`), `Блок группы студентов`);
  }

  get searchByFullNameField(): Input {
    return new Input(this.page.getByPlaceholder('Поиск по ФИО'), 'Поиск по ФИО');
  }

  studentCardBlock(fullName: string): Block {
    return new Block(
      this.page.locator(`[data-testid="studentCard"]:has-text("${fullName}")`),
      `Блок обучающегося «${fullName}»`,
    );
  }

  studentInfoBlock(fullName: string, text: string): Block {
    return new Block(
      this.studentCardBlock(fullName).getLocator.locator(`:text("${text}")`),
      `Студент «${fullName}» имеет «${text}»`,
    );
  }

  typeWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="groupType-container"] >> [class*="errorText"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Тип группы»`,
    );
  }

  titleWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="title.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Название группы»`,
    );
  }

  emailWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="email.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Почта»`,
    );
  }

  lastNameWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="lastName.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Фамилия»`,
    );
  }

  firstNameWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="firstName.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Имя»`,
    );
  }

  middleNameWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="middleName.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Отчество»`,
    );
  }

  snilsNumberWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="snilsNumber.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «СНИЛС»`,
    );
  }

  innNumberWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="innNumber.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «ИНН»`,
    );
  }

  financingWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="financingSource-container"] >> [class*="errorText"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Источник финансирования»`,
    );
  }

  personalNumberWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="personalNumber.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Личный номер»`,
    );
  }

  bookNumberWrapper(text: string): Block {
    return new Block(
      this.page.locator(`[data-testid="bookNumber.Wrapper.Meta"]:has-text("${text}")`),
      `Сообщение ${text} у поля «Номер зачетной книжки»`,
    );
  }

  groupBlock(groupTitle: string): Block {
    return new Block(
      this.page.locator(`[data-testid="groupBlock"]:has-text("${groupTitle}")`),
      `Блок группы студентов «${groupTitle}»`,
    );
  }

  groupStubBlock(groupTitle: string): Block {
    return new Block(
      this.groupBlock(groupTitle).getLocator.locator(`:text("Обучающиеся ещё не добавлены")`),
      `Блок группы студентов «${groupTitle}»`,
    );
  }

  groupAccordionButton(groupTitle: string): Button {
    return new Button(
      this.groupBlock(groupTitle).getLocator.locator('[class*="iconLeft"]'),
      `Раскрыть аккордеон группы «${groupTitle}»`,
    );
  }

  groupActionSelect(groupTitle: string): MoreActions {
    return new MoreActions(
      this.groupBlock(groupTitle).getLocator.locator(
        '[data-testid="EDUKit.DropdownMenu.OpenNode"]:has-text("Действия")',
      ),
      `Раскрыть меню действий у «${groupTitle}»`,
    );
  }

  groupCountBlock(groupTitle: string, count: number): Block {
    return new Block(
      this.groupBlock(groupTitle).getLocator.locator(`:text("Обучающиеся: ${count}")`),
      `У группы «${groupTitle}» ${count} студентов`,
    );
  }

  groupStudentBlock(groupTitle: string, fullName: string): Block {
    return new Block(
      this.groupBlock(groupTitle).getLocator.locator(`[data-testid="studentCard"]:has-text("${fullName}")`),
      `Блок студента «${fullName}» в группе «${groupTitle}»`,
    );
  }

  groupStudentAction(groupTitle: string, fullName: string): MoreActions {
    return new MoreActions(
      this.groupStudentBlock(groupTitle, fullName).getLocator.locator(`[data-testid="EDUKit.DropdownMenu.OpenNode"]`),
      `Раскрыть меню действий у студента «${fullName}» в группе «${groupTitle}»`,
    );
  }

  async open(): Promise<void> {
    await this.page.goto(`${this.baseURL}/eduplan/plan/epl_2Kb1TimnZGbvHcZCy3AiqX1z7og/student-group/list`);
  }
}
