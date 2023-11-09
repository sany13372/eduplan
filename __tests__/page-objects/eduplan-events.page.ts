import { Page } from '@playwright/test';

import { Input } from '../locators/input';
import { Button } from '../locators/button';
import { Select } from '../locators/select';
import { Block } from '../locators/block';
import { Switch } from '../locators/switch';
import { Modal } from '../page-elements/modal/modal';

import { UIKitLocators } from './common/UIKitLocators';
import { BasePage } from './common/base-page';

export class EduPlanEventsPage extends BasePage {
  uiKit: UIKitLocators;

  baseURL: string;

  modal: Modal;

  constructor(page: Page, baseURL: string) {
    super(page);
    this.baseURL = baseURL;
    this.uiKit = new UIKitLocators(page);
    this.modal = new Modal(page);
  }

  get pastEventTab(): Button {
    return new Button(this.page.locator('[data-testid="tabs.Tab.past"]'), 'Вкладка «Прошедшие»');
  }

  get eventKindFilterSelect(): Select {
    return new Select(this.page.locator('[data-testid="kindFilter.OpenNode"]'), 'Фильтр «Вид события»');
  }

  get backToEventsListButton(): Button {
    return new Button(this.page.getByText('К списку событий'), 'К списку событий');
  }

  get backToEventCardButton(): Button {
    return new Button(this.page.getByText('К карточке события'), 'К карточке события');
  }

  get linkField(): Input {
    return new Input(this.page.locator('[data-testid="link"]'), 'Ссылка');
  }

  get placeField(): Input {
    return new Input(this.page.locator('[data-testid="place"]'), 'Место проведения');
  }

  get serviceSelect(): Select {
    return new Select(this.page.locator('[data-testid="videoConfKind-container"]'), 'Сервис');
  }

  get descriptionField(): Input {
    return new Input(this.page.locator('[data-testid="UIKit.Textarea.InputField"]'), 'Описание');
  }

  get dateField(): Input {
    return new Input(this.page.locator('[data-testid="date"]'), 'Дата');
  }

  get startTimeField(): Input {
    return new Input(this.page.locator('[data-testid="startTime"]'), 'Время (Начало)');
  }

  get endTimeField(): Input {
    return new Input(this.page.locator('[data-testid="endTime"]'), 'Время (Конец)');
  }

  get formatSelect(): Select {
    return new Select(this.page.locator('[data-testid="format-container"]'), 'Формат проведения');
  }

  get fartherButton(): Button {
    return new Button(this.page.locator('span', { hasText: 'Далее' }), 'Далее');
  }

  get inviteButton(): Button {
    return new Button(this.page.locator('span', { hasText: 'Пригласить' }), 'Пригласить');
  }

  get searchFullNameField(): Input {
    return new Input(this.page.getByPlaceholder('Поиск по ФИО'), 'Поиск по ФИО');
  }

  get eventCardInfoBlock(): Block {
    return new Block(
      this.page.locator('[data-testid="eventInfo"] >> [data-testid="eventValue"] >> p'),
      'Информация о событие',
    );
  }

  get tabParticipantListButton(): Button {
    return new Button(this.page.locator('#participantList'), 'Вкладка «Участники»');
  }

  get eventHeaderStub(): Block {
    return new Block(
      this.page.locator('h1', { hasText: 'Здесь будут находиться события' }),
      'Заглушка «Здесь будут находиться события»',
    );
  }

  get eventTextStub(): Block {
    return new Block(
      this.page.locator('p', { hasText: 'Чтобы создать событие, нажмите на кнопку «Добавить»' }),
      'Заглушка «Чтобы создать событие, нажмите на кнопку «Добавить»',
    );
  }

  get incorrectFilteringMembersHeaderStub(): Block {
    return new Block(
      this.page.locator('h1', { hasText: 'Мы не нашли таких участников' }),
      'Заглушка «Мы не нашли таких участников»',
    );
  }

  get incorrectFilteringTextStub(): Block {
    return new Block(
      this.page.locator('p', { hasText: 'Измените параметры поиска и повторите попытку' }),
      'Заглушка «Измените параметры поиска и повторите попытку»',
    );
  }

  get incorrectFilteringEventsHeaderStub(): Block {
    return new Block(
      this.page.locator('h1', { hasText: 'Такие события не найдены' }),
      'Заглушка «Такие события не найдены»',
    );
  }

  get participantsHeaderStub(): Block {
    return new Block(
      this.page.locator('h1', { hasText: 'Участники еще не приглашены' }),
      'Заглушка «Участники еще не приглашены»',
    );
  }

  get eventsForm(): Block {
    return new Block(this.page.locator('[data-testid="eventsForm"]'), 'Форма «События»');
  }

  get recordBlock(): Block {
    return new Block(this.page.locator(`[data-testid="event-record"]`), 'Блок «Запись вебинара»');
  }

  get addingParticipantsWidget(): Block {
    return new Block(this.page.locator('[data-testid="addingParticipantsWidget"]'), 'Виджет «Добавление участников»');
  }

  get addingParticipantsWidgetCancelButton(): Button {
    return new Button(
      this.addingParticipantsWidget.getLocator.getByText('Отмена'),
      'Кнопка «Отмена» в виджете «Добавление участников»',
    );
  }

  get addingParticipantsWidgetCrossButton(): Button {
    return new Button(
      this.addingParticipantsWidget.getLocator.locator('[data-icon-name="master-close"]'),
      'Кнопка «Х (крестик)» в виджете «Добавление участников»',
    );
  }

  get recordLookButton(): Button {
    return new Button(
      this.recordBlock.getLocator.locator(`:text("Смотреть")`),
      'Кнопка «Смотреть» в блоке «Запись вебинара»',
    );
  }

  placeBlock(badge: string): Block {
    return new Block(this.page.locator(`[data-testid="event-place"] >> :text("${badge}")`), 'Место проведения');
  }

  linkBlock(badge: string): Block {
    return new Block(this.page.locator(`[data-testid="event-link"] >> :text("${badge}")`), 'Ссылка');
  }

  recordBadgeBlock(badge: string): Block {
    return new Block(this.recordBlock.getLocator.locator(`:text("${badge}")`), 'Бейдж в блоке «Запись вебинара»');
  }

  descriptionBlock(text: string): Block {
    return new Block(this.page.locator(`[data-testid="aboutEvent"] >> :text("${text}")`), 'Описание');
  }

  addingParticipantsWidgetMemberBlock(fullName: string): Block {
    return new Block(
      this.addingParticipantsWidget.getLocator.locator(`[data-testid="eventParticipantBlock"]:has-text("${fullName}")`),
      `Участник ${fullName} в виджете «Добавление участников»`,
    );
  }

  participantsTextStub(buttonName: string): Block {
    return new Block(
      this.page.locator('p', { hasText: `Чтобы пригласить участников, нажмите на кнопку «${buttonName}»` }),
      `Заглушка «Чтобы пригласить участников, нажмите на кнопку "${buttonName}"»`,
    );
  }

  participantBlock(fullName: string): Switch {
    return new Switch(
      this.page.locator(`[data-testid="eventParticipantBlock"] >> :has-text("${fullName}")`),
      `Участник: ${fullName}`,
    );
  }

  participantsCheckbox(fullName: string): Switch {
    return new Switch(
      this.participantBlock(fullName).getLocator.locator('[data-testid="EDUKit.Checkbox.Label"]'),
      `Выделить участника: ${fullName}`,
    );
  }

  roleSelect(fullName: string): Select {
    return new Select(
      this.participantBlock(fullName).getLocator.locator('[data-testid="UIKit.Selectbox.OpenNode"]'),
      `Роли для участник «${fullName}»`,
    );
  }

  deleteParticipantButton(fullName: string): Button {
    return new Button(
      this.participantBlock(fullName).getLocator.locator('[aria-label="remove"]'),
      `Удалить участника «${fullName}»`,
    );
  }

  participantInfoBlock(fullName: string): Block {
    return new Block(
      this.participantBlock(fullName).getLocator.locator('[data-testid="participantInfo"]  >> span'),
      'Информация об участнике',
    );
  }

  eventBlock(eventName: string): Button {
    return new Button(
      this.page.locator(`[data-testid="eventCardBlock"]:has-text("${eventName}")`),
      `Опубликовать событие «${eventName}»`,
    );
  }

  publishEvent(eventName: string): Switch {
    return new Switch(
      this.eventBlock(eventName).getLocator.locator('[data-testid="UIKit.Switch.Label"]'),
      `Опубликовать событие «${eventName}»`,
    );
  }

  deleteEvent(eventName: string): Button {
    return new Button(
      this.eventBlock(eventName).getLocator.locator('[aria-label="remove"]'),
      `Удалить событие «${eventName}»`,
    );
  }

  aboutEventBlock(description: string): Block {
    return new Block(
      this.page.locator(`[data-testid="aboutEvent"]:has-text("О событии"):has-text("${description}")`),
      `Блок «О событии»`,
    );
  }

  async openEduPanEvents(): Promise<void> {
    await this.page.goto(`${this.baseURL}/eduplan/plan/epl_2Kb1TimnZGbvHcZCy3AiqX1z7og/events`);
  }
}
