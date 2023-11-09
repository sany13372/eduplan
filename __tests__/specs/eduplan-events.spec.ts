/* eslint-disable no-await-in-loop,@typescript-eslint/no-unused-expressions */

import { expect } from '@playwright/test';

import { test } from '../fixtures/academy.fixtures';
import { EventModel } from '../utils/data/model/event.model';
import { StudentModel } from '../utils/data/model/student.model';
import { DateFormat } from '../utils/data/model/enums/dateFormat';
import { EventAnswer } from '../utils/data/enum/event.answer.enum';
import { DataGenerator } from '../utils/data/generator.data';
import { EVENT_VALIDATION_DATA } from '../utils/data/validation/event.validation';

const form = { add: 'Добавление события', set: 'Редактирование события', list: 'События' };
const field = {
  kind: 'Вид',
  format: 'Формат проведения',
  title: 'Название',
  service: 'Сервис',
  place: 'Место проведения',
  link: 'Ссылка',
  description: 'Описание',
  date: 'Дата',
  time: 'Время',
};

let student: StudentModel;
let event: EventModel;
let participantName: string;

test.describe('|Планы обучения| События', () => {
  test.beforeEach(() => {
    student = new StudentModel({});
    event = new EventModel({ isPublished: false });
    participantName = `${student.lastName} ${student.firstName} ${student.middleName}`;
  });

  test('#SBO-T4529 Добавить онлайн событие с типом «Другой сервис»', async ({ eventPage, eventApiMock, helper }) => {
    event = new EventModel({ isPublished: false, format: { name: 'Онлайн', code: 'online' } });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);
    const date = helper.getDateInFormat(event.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(event.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(event.endAt, DateFormat.HHmm);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.addButton.click();
    await expect(eventPage.uiKit.textLabel(form.add).getLocator).toBeVisible();
    await expect(eventPage.placeField.getLocator).not.toBeVisible();
    await eventPage.uiKit.titleField.fill(event.title);
    await eventPage.serviceSelect.chooseOption(event.service.name);
    await eventPage.linkField.fill(event.link);
    await eventPage.descriptionField.fill(event.description);
    await eventPage.dateField.fill(date);
    await eventPage.startTimeField.fill(startAt);
    await eventPage.endTimeField.fill(endAt);
    await eventPage.fartherButton.click();
    await expect(eventPage.searchFullNameField.getLocator).toBeVisible();
    await eventPage.participantsCheckbox(participantName).click(true);
    await eventPage.roleSelect(participantName).chooseOption(event.role);
    await eventPage.uiKit.saveButton.click();

    const eventInfo = [event.kind.name, event.format.name, date, startAt, date, endAt];
    await expect(eventPage.uiKit.editButton.getLocator).toBeEnabled();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.linkBlock(event.link).getLocator).toBeVisible();
    await expect(eventPage.descriptionBlock(event.description).getLocator).toBeVisible();
    expect(await eventPage.eventCardInfoBlock.getBlockValues()).toEqual(eventInfo);

    await eventPage.tabParticipantListButton.click();
    const expectParticipantInfo = [event.role, student.course.name, student.group];
    expect(await eventPage.participantInfoBlock(participantName).getBlockValues()).toEqual(expectParticipantInfo);
  });

  test('#SBO-T4530 Добавить оффлайн событие', async ({ eventPage, eventApiMock, helper }) => {
    event = new EventModel({ isPublished: false, format: { name: 'Оффлайн', code: 'offline' } });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);
    const date = helper.getDateInFormat(event.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(event.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(event.endAt, DateFormat.HHmm);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.addButton.click();
    await expect(eventPage.uiKit.textLabel(form.add).getLocator).toBeVisible();
    await eventPage.formatSelect.chooseOption(event.format.name);
    await expect(eventPage.linkField.getLocator).toBeHidden();
    await eventPage.uiKit.titleField.fill(event.title);
    await eventPage.placeField.fill(event.place);
    await eventPage.descriptionField.fill(event.description);
    await eventPage.dateField.fill(date);
    await eventPage.startTimeField.fill(startAt);
    await eventPage.endTimeField.fill(endAt);
    await eventPage.fartherButton.click();
    await expect(eventPage.searchFullNameField.getLocator).toBeVisible();
    await eventPage.participantsCheckbox(participantName).click(true);
    await eventPage.roleSelect(participantName).chooseOption(event.role);
    await eventPage.uiKit.saveButton.click();

    const expectEventInfo = [event.kind.name, event.format.name, date, startAt, date, endAt];
    await expect(eventPage.uiKit.editButton.getLocator).toBeEnabled();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.placeBlock(event.place).getLocator).toBeVisible();
    await expect(eventPage.descriptionBlock(event.description).getLocator).toBeVisible();
    expect(await eventPage.eventCardInfoBlock.getBlockValues()).toEqual(expectEventInfo);

    await eventPage.tabParticipantListButton.click();
    const expectParticipantInfo = [event.role, student.course.name, student.group];
    expect(await eventPage.participantInfoBlock(participantName).getBlockValues()).toEqual(expectParticipantInfo);
  });

  test('#SBO-T4532 Добавить смешанное событие с типом «Другой сервис»', async ({ eventPage, eventApiMock, helper }) => {
    event = new EventModel({ isPublished: false, format: { name: 'Смешанный', code: 'mixed' } });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);
    const date = helper.getDateInFormat(event.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(event.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(event.endAt, DateFormat.HHmm);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.addButton.click();
    await expect(eventPage.uiKit.textLabel(form.add).getLocator).toBeVisible();
    await eventPage.formatSelect.chooseOption(event.format.name);
    await eventPage.uiKit.titleField.fill(event.title);
    await eventPage.serviceSelect.chooseOption(event.service.name);
    await eventPage.placeField.fill(event.place);
    await eventPage.linkField.fill(event.link);
    await eventPage.descriptionField.fill(event.description);
    await eventPage.dateField.fill(date);
    await eventPage.startTimeField.fill(startAt);
    await eventPage.endTimeField.fill(endAt);
    await eventPage.fartherButton.click();
    await expect(eventPage.searchFullNameField.getLocator).toBeVisible();
    await eventPage.participantsCheckbox(participantName).click(true);
    await eventPage.roleSelect(participantName).chooseOption(event.role);
    await eventPage.uiKit.saveButton.click();

    const expectEventInfo = [event.kind.name, event.format.name, date, startAt, date, endAt];
    await expect(eventPage.uiKit.editButton.getLocator).toBeEnabled();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.linkBlock(event.link).getLocator).toBeVisible();
    await expect(eventPage.placeBlock(event.place).getLocator).toBeVisible();
    await expect(eventPage.descriptionBlock(event.description).getLocator).toBeVisible();
    expect(await eventPage.eventCardInfoBlock.getBlockValues()).toEqual(expectEventInfo);

    await eventPage.tabParticipantListButton.click();
    const expectParticipantInfo = [event.role, student.course.name, student.group];
    expect(await eventPage.participantInfoBlock(participantName).getBlockValues()).toEqual(expectParticipantInfo);
  });

  test('#SBO-T4564 Добавить событие без участников', async ({ eventPage, eventApiMock, helper }) => {
    event = new EventModel({ isPublished: false, format: { name: 'Онлайн', code: 'online' } });
    await eventApiMock.mockSettingEvents(EventAnswer.EMPTY_PARTICIPANTS, event, student);
    const date = helper.getDateInFormat(event.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(event.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(event.endAt, DateFormat.HHmm);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.addButton.click();
    await expect(eventPage.uiKit.textLabel(form.add).getLocator).toBeVisible();
    await eventPage.uiKit.titleField.fill(event.title);
    await eventPage.serviceSelect.chooseOption(event.service.name);
    await eventPage.linkField.fill(event.link);
    await eventPage.dateField.fill(date);
    await eventPage.startTimeField.fill(startAt);
    await eventPage.endTimeField.fill(endAt);
    await eventPage.fartherButton.click();
    await expect(eventPage.searchFullNameField.getLocator).toBeVisible();
    await eventPage.participantsCheckbox('Конфигуратор Тест Тестович').click(false);
    await eventPage.uiKit.saveButton.click();

    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await eventPage.tabParticipantListButton.click();
    await expect(eventPage.participantsHeaderStub.getLocator).toBeVisible();
    await expect(eventPage.participantsTextStub(eventPage.uiKit.editButton.getName).getLocator).toBeVisible();
    await eventPage.uiKit.editButton.click();
    await expect(eventPage.participantsHeaderStub.getLocator).toBeVisible();
    await expect(eventPage.participantsTextStub(eventPage.inviteButton.getName).getLocator).toBeVisible();
  });

  test('#SBO-T4513 Функциональность вкладки при отсутствие записей', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockListEvents(EventAnswer.EMPTY_EVENTS, event);

    await eventPage.openEduPanEvents();
    await expect(eventPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await expect(eventPage.eventHeaderStub.getLocator).toBeVisible();
    await expect(eventPage.eventTextStub.getLocator).toBeVisible();
    await expect(eventPage.uiKit.addButton.getLocator).toBeVisible();
  });

  test('#SBO-T4567 Редактировать не опубликованную запись [Описание]', async ({ eventPage, eventApiMock, helper }) => {
    const message = 'Данные события успешно обновлены';
    const newEvent = new EventModel({ isPublished: false });
    await eventApiMock.mockSettingEvents(EventAnswer.EMPTY_PARTICIPANTS, event, student);
    const date = helper.getDateInFormat(newEvent.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(newEvent.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(newEvent.endAt, DateFormat.HHmm);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await eventPage.uiKit.editButton.click();
    await expect(eventPage.uiKit.textLabel(form.set).getLocator).toBeVisible();
    await eventPage.uiKit.titleField.fill(newEvent.title);
    await eventPage.placeField.fill(String(newEvent.place));
    await eventPage.linkField.fill(String(newEvent.link));
    await eventPage.descriptionField.fill(newEvent.description);
    await eventPage.dateField.fill(date);
    await eventPage.startTimeField.fill(startAt);
    await eventPage.endTimeField.fill(endAt);
    await eventPage.uiKit.saveButton.click();

    const expectEventInfo = [event.kind.name, event.format.name, date, startAt, date, endAt];
    await expect(eventPage.uiKit.editButton.getLocator).toBeEnabled();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.uiKit.textLabel(message).getLocator).toBeVisible();
    await expect(eventPage.uiKit.textLabel(event.place).getLocator).toBeVisible();
    await expect(eventPage.uiKit.textLabel(event.link).getLocator).toBeVisible();
    await expect(eventPage.aboutEventBlock(event.description).getLocator).toBeVisible();
    expect(await eventPage.eventCardInfoBlock.getBlockValues()).toEqual(expectEventInfo);
  });

  test('#SBO-T4566 Редактировать опубликованную запись [Описание]', async ({ eventPage, eventApiMock }) => {
    event = new EventModel({ isPublished: true });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.uiKit.editButton.getLocator).toBeDisabled();
  });

  test('#SBO-T4517 Удалить событие', async ({ eventPage, eventApiMock }) => {
    const message = 'Событие было успешно удалено';
    await eventApiMock.mockListEvents(EventAnswer.SUCCESS, event);

    await eventPage.openEduPanEvents();
    await eventPage.deleteEvent(event.title).click();
    await eventPage.modal.removeButton.click();

    await expect(eventPage.uiKit.textLabel(message).getLocator).toBeVisible();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeHidden();
  });

  test('#SBO-T6855 Удалить опубликованное событие', async ({ eventPage, eventApiMock }) => {
    event = new EventModel({ isPublished: true });
    await eventApiMock.mockListEvents(EventAnswer.SUCCESS, event);

    await eventPage.openEduPanEvents();
    await expect(eventPage.deleteEvent(event.title).getLocator).toBeDisabled();
  });

  test('#SBO-T4576 Редактировать запись [Участники]', async ({ eventPage, eventApiMock }) => {
    const message = 'Список участников успешно обновлён';
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await eventPage.tabParticipantListButton.click();
    await eventPage.uiKit.editButton.click();
    await expect(eventPage.uiKit.textLabel(form.set).getLocator).toBeVisible();
    await eventPage.deleteParticipantButton(participantName).click();
    await expect(eventPage.participantBlock(participantName).getLocator).toBeHidden();
    await eventPage.roleSelect('Конфигуратор Тест Тестович').chooseOption(event.role);
    await eventPage.uiKit.saveButton.click();

    const expectParticipantInfo = [event.role, student.course.name, student.group];
    await expect(eventPage.uiKit.editButton.getLocator).toBeVisible();
    await expect(eventPage.uiKit.toastBlock(message).getLocator).toBeVisible();
    await expect(eventPage.uiKit.textLabel(participantName).getLocator).toBeVisible();
    expect(await eventPage.participantInfoBlock(participantName).getBlockValues()).toEqual(expectParticipantInfo);
  });

  test('#SBO-T4585 Пригласить новых участников в форме редактирования [Участники]', async ({
    eventPage,
    eventApiMock,
  }) => {
    const message = 'Список участников успешно обновлён';
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);
    participantName = 'Mante Telly Jaden';

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await eventPage.tabParticipantListButton.click();
    await eventPage.uiKit.editButton.click();
    await expect(eventPage.uiKit.textLabel(form.set).getLocator).toBeVisible();
    await eventPage.inviteButton.click();
    await eventPage.participantsCheckbox(participantName).click(true);
    await eventPage.roleSelect(participantName).chooseOption(event.role);
    await eventPage.uiKit.addButton.click();
    await expect(eventPage.uiKit.textLabel(participantName).getLocator).toBeVisible();
    await eventPage.uiKit.saveButton.click();

    await expect(eventPage.uiKit.editButton.getLocator).toBeVisible();
    await expect(eventPage.uiKit.textLabel(message).getLocator).toBeVisible();
  });

  test('#SBO-T4516 Опубликовать событие', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockListEvents(EventAnswer.SUCCESS, event);

    await eventPage.openEduPanEvents();
    await eventPage.publishEvent(event.title).click(true);
    await expect(eventPage.deleteEvent(event.title).getLocator).toBeDisabled();
  });

  test('#SBO-T5514 Опубликовать прошедшие событие', async ({ eventPage, eventApiMock }) => {
    event = new EventModel({
      isPublished: false,
      startAt: new DataGenerator().date({ month: -2 }),
      endAt: new DataGenerator().date({ month: -1 }),
    });
    await eventApiMock.mockListEvents(EventAnswer.SUCCESS, event);

    await eventPage.openEduPanEvents();
    await eventPage.pastEventTab.click();
    await expect(eventPage.publishEvent(event.title).getLocator).toBeDisabled();
  });

  test('#SBO-T4519 Отображение стрелочки «Наверх» при просмотре записей', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockListEvents(EventAnswer.SUCCESS, event);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.headerH2Block(form.list).setFocus();

    await eventPage.page.keyboard.down('End');
    await expect(eventPage.uiKit.climbUpButton.getLocator).toBeVisible();
    await eventPage.uiKit.climbUpButton.click();
    await expect(eventPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await expect(eventPage.uiKit.climbUpButton.getLocator).toBeHidden();
  });

  test('#SBO-T4535 Навигация в форме добавления [Описание]', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    for (const label of [eventPage.uiKit.cancelButton.getName, eventPage.backToEventsListButton.getName]) {
      await eventPage.uiKit.addButton.click();
      await eventPage.uiKit.textLabel(label).click();
      await expect(eventPage.uiKit.addButton.getLocator).toBeVisible();

      await eventPage.uiKit.addButton.click();
      await eventPage.uiKit.titleField.fill(event.title);
      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.stayButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.descriptionField.fill(event.description);
      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.closeButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.leaveButton.click();
      await expect(eventPage.uiKit.addButton.getLocator).toBeVisible();
    }
  });

  test('#SBO-T4540 Навигация в форме добавления [Участники]', async ({ eventPage, eventApiMock, helper }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);
    const date = helper.getDateInFormat(event.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(event.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(event.endAt, DateFormat.HHmm);

    await eventPage.openEduPanEvents();
    for (const label of [eventPage.uiKit.cancelButton.getName, eventPage.backToEventsListButton.getName]) {
      await eventPage.uiKit.addButton.click();
      await eventPage.uiKit.titleField.fill(event.title);
      await eventPage.serviceSelect.chooseOption(event.service.name);
      await eventPage.linkField.fill(event.link);
      await eventPage.dateField.fill(date);
      await eventPage.startTimeField.fill(startAt);
      await eventPage.endTimeField.fill(endAt);
      await eventPage.fartherButton.click();
      await eventPage.uiKit.toastBlock().setFocus();

      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.stayButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.closeButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.leaveButton.click();
      await expect(eventPage.uiKit.addButton.getLocator).toBeVisible();
    }
  });

  test('#SBO-T4588 Навигация в форме просмотра', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.backToEventsListButton.click();
    await expect(eventPage.uiKit.addButton.getLocator).toBeVisible();

    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();
    await eventPage.backToEventsListButton.click();
    await expect(eventPage.uiKit.addButton.getLocator).toBeVisible();
  });

  test('#SBO-T4586 Навигация в виджете «Пригласить», форма редактирования [Участники]', async ({
    eventPage,
    eventApiMock,
  }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();
    await eventPage.uiKit.editButton.click();

    await eventPage.inviteButton.click();
    await eventPage.addingParticipantsWidgetCancelButton.click();
    await expect(eventPage.addingParticipantsWidget.getLocator).toBeHidden();

    await eventPage.inviteButton.click();
    await eventPage.addingParticipantsWidgetCrossButton.click();
    await expect(eventPage.addingParticipantsWidget.getLocator).toBeHidden();

    await eventPage.roleSelect('Конфигуратор').scrollToElementIfNeeded();
    await expect(eventPage.uiKit.climbUpButton.getLocator).toBeVisible();
    await eventPage.uiKit.climbUpButton.click();
    await expect(eventPage.uiKit.textLabel(form.set).getLocator).toBeVisible();
    await expect(eventPage.uiKit.climbUpButton.getLocator).toBeHidden();
  });

  test('#SBO-T4568 Навигация в форме редактирования [Описание]', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    for (const label of [eventPage.uiKit.cancelButton.getName, eventPage.backToEventCardButton.getName]) {
      await eventPage.uiKit.editButton.click();
      await eventPage.uiKit.textLabel(label).click();
      await expect(eventPage.uiKit.editButton.getLocator).toBeVisible();

      await eventPage.uiKit.editButton.click();
      await eventPage.uiKit.titleField.fill(new DataGenerator().jobTitle());
      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.stayButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.descriptionField.fill(new DataGenerator().paragraph());
      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.closeButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.leaveButton.click();
      await expect(eventPage.uiKit.editButton.getLocator).toBeVisible();
    }
  });

  test('#SBO-T4569 Навигация в форме редактирования [Участники]', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();
    for (const label of [eventPage.uiKit.cancelButton.getName, eventPage.backToEventCardButton.getName]) {
      await eventPage.uiKit.editButton.click();
      await eventPage.uiKit.textLabel(label).click();
      await expect(eventPage.uiKit.editButton.getLocator).toBeVisible();

      await eventPage.uiKit.editButton.click();
      await eventPage.roleSelect(participantName).chooseOption('Участник');
      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.stayButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.deleteParticipantButton(participantName).click();
      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.closeButton.click();
      await expect(eventPage.modal.block.getLocator).toBeHidden();

      await eventPage.uiKit.textLabel(label).click();
      await eventPage.modal.leaveButton.click();
      await expect(eventPage.uiKit.editButton.getLocator).toBeVisible();
    }

    await eventPage.uiKit.textLabel(participantName).setFocus();
    await eventPage.page.keyboard.down('End');
    await expect(eventPage.uiKit.climbUpButton.getLocator).toBeVisible();
    await eventPage.uiKit.climbUpButton.click();
    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.uiKit.climbUpButton.getLocator).toBeHidden();
  });

  test('#SBO-T4543 Фильтрация в форме добавления [Участники]', async ({ eventPage, eventApiMock, helper }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);
    const date = helper.getDateInFormat(event.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(event.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(event.endAt, DateFormat.HHmm);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.addButton.click();
    await eventPage.uiKit.titleField.fill(event.title);
    await eventPage.serviceSelect.chooseOption(event.service.name);
    await eventPage.linkField.fill(event.link);
    await eventPage.dateField.fill(date);
    await eventPage.startTimeField.fill(startAt);
    await eventPage.endTimeField.fill(endAt);
    await eventPage.fartherButton.click();

    await eventPage.searchFullNameField.fill(participantName);
    await expect(eventPage.uiKit.textLabel(participantName).getLocator).toBeVisible();

    await eventPage.searchFullNameField.fill(new DataGenerator().companyName());
    await expect(eventPage.incorrectFilteringMembersHeaderStub.getLocator).toBeVisible();
    await expect(eventPage.incorrectFilteringTextStub.getLocator).toBeVisible();
  });

  test('#SBO-T4584 Фильтрация в виджете «Пригласить», форма редактирования [Участники]', async ({
    eventPage,
    eventApiMock,
  }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();
    await eventPage.uiKit.editButton.click();
    await eventPage.inviteButton.click();

    await eventPage.searchFullNameField.fill(participantName);
    await expect(eventPage.addingParticipantsWidgetMemberBlock(participantName).getLocator).toBeVisible();

    await eventPage.searchFullNameField.fill(new DataGenerator().companyName());
    await expect(eventPage.incorrectFilteringMembersHeaderStub.getLocator).toBeVisible();
    await expect(eventPage.incorrectFilteringTextStub.getLocator).toBeVisible();
  });

  test('#SBO-T4587 Пригласить всех участников в форме редактирования [Участники]', async ({
    eventPage,
    eventApiMock,
  }) => {
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();
    await eventPage.uiKit.editButton.click();
    await eventPage.inviteButton.click();
    await eventPage.uiKit.labelCheckbox.clickOnAll();
    await eventPage.uiKit.addButton.click();

    await expect(eventPage.inviteButton.getLocator).toBeDisabled();
  });

  EVENT_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T4533 Валидация в форме добавления «${obj.name}»`, async ({ eventPage, eventApiMock }) => {
      event = new EventModel({ isPublished: false, format: { name: 'Смешанный', code: 'mixed' } });
      await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

      await eventPage.openEduPanEvents();
      await eventPage.uiKit.addButton.click();
      await eventPage.formatSelect.chooseOption(event.format.name);
      obj.service?.value && (await eventPage.serviceSelect.chooseOption(obj.service.value));
      obj.link?.value && (await eventPage.linkField.fill(String(obj.link.value)));
      await eventPage.uiKit.titleField.fill(obj.title.value);
      await eventPage.placeField.fill(String(obj.place.value));
      await eventPage.descriptionField.fill(obj.description.value);
      await eventPage.dateField.fill(obj.date.value);
      await eventPage.startTimeField.fill(obj.startAt.value);
      await eventPage.endTimeField.fill(obj.endAt.value);
      await eventPage.fartherButton.click();

      obj.title?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.title, obj.title.message).getLocator).toBeVisible());
      obj.service?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.service, obj.service.message).getLocator).toBeVisible());
      obj.place?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.place, obj.place.message).getLocator).toBeVisible());
      obj.link?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.link, obj.link.message).getLocator).toBeVisible());
      obj.description?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.description, obj.description.message).getLocator).toBeVisible());
      obj.date?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.date, obj.date.message).getLocator).toBeVisible());
      obj.startAt?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.time, obj.startAt.message).getLocator).toBeVisible());
      obj.endAt?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.time, obj.endAt.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' && (await expect(eventPage.searchFullNameField.getLocator).toBeVisible());
    });
  });

  EVENT_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T4583 Валидация в форме редактирования [Описание] «${obj.name}»`, async ({
      eventPage,
      eventApiMock,
    }) => {
      event = new EventModel({ isPublished: false, format: { name: 'Смешанный', code: 'mixed' } });
      await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

      await eventPage.openEduPanEvents();
      await eventPage.eventBlock(event.title).click();
      await eventPage.uiKit.editButton.click();
      await eventPage.uiKit.titleField.fill(obj.title.value);
      await eventPage.placeField.fill(obj.place.value);
      await eventPage.linkField.fill(obj.link.value);
      await eventPage.descriptionField.fill(obj.description.value);
      await eventPage.dateField.manualFill(obj.date.value);
      await eventPage.startTimeField.fill(obj.startAt.value);
      await eventPage.endTimeField.fill(obj.endAt.value);
      await eventPage.uiKit.saveButton.click();

      obj.title?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.title, obj.title.message).getLocator).toBeVisible());
      obj.place?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.place, obj.place.message).getLocator).toBeVisible());
      obj.link?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.link, obj.link.message).getLocator).toBeVisible());
      obj.description?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.description, obj.description.message).getLocator).toBeVisible());
      obj.date?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.date, obj.date.message).getLocator).toBeVisible());
      obj.startAt?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.time, obj.startAt.message).getLocator).toBeVisible());
      obj.endAt?.message &&
        (await expect(eventPage.uiKit.fieldBlock(field.time, obj.endAt.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' && (await expect(eventPage.uiKit.editButton.getLocator).toBeVisible());
    });
  });

  test('#SBO-T4547 Форма просмотра [Описание]', async ({ eventPage, eventApiMock }) => {
    event = new EventModel({
      isPublished: false,
      format: { name: 'Смешанный', code: 'mixed' },
      title: 'Название события',
      link: 'https://jazz.sber.ru/d02km4?psw=OB0AAh1UBkRRDQcUQkARV14HGg',
      place: 'Менделеевская линия, 2, Санкт-Петербург',
      description: 'Активизация научной и инновационной деятельности педагогических работников.',
      startAt: new Date(2040, 0, 3, 2, 0),
      endAt: new Date(2040, 0, 3, 4, 2),
    });
    await eventPage.page.setViewportSize({ width: 1100, height: 1000 });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();

    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.page).toHaveScreenshot([`viewDescription.png`], { fullPage: true });
  });

  test('#SBO-T4546 Форма просмотра [Участники]', async ({ eventPage, eventApiMock }) => {
    event = new EventModel({ isPublished: false, title: 'Название события' });
    student = new StudentModel({
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      course: { name: '1 курс', code: '1' },
      group: 'УГ-1644',
    });
    await eventPage.page.setViewportSize({ width: 1100, height: 1000 });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();

    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.page).toHaveScreenshot([`viewParticipants.png`]);
  });

  test('#SBO-T4525 Форма добавления [Описание]', async ({ eventPage, eventApiMock }) => {
    await eventPage.page.setViewportSize({ width: 1100, height: 1000 });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.addButton.click();

    await expect(eventPage.uiKit.textLabel(form.add).getLocator).toBeVisible();
    await expect(eventPage.page).toHaveScreenshot([`addingDescription.png`], { fullPage: true });
  });

  test('#SBO-T4565 Форма редактирования [Описание]', async ({ eventPage, eventApiMock }) => {
    event = new EventModel({
      isPublished: false,
      format: { name: 'Смешанный', code: 'mixed' },
      title: 'Название события',
      link: 'https://jazz.sber.ru/d02km4?psw=OB0AAh1UBkRRDQcUQkARV14HGg',
      place: 'Менделеевская линия, 2, Санкт-Петербург',
      description: 'Активизация научной и инновационной деятельности педагогических работников.',
      startAt: new Date(2040, 0, 3, 2, 0),
      endAt: new Date(2040, 0, 3, 4, 2),
    });
    await eventPage.page.setViewportSize({ width: 1100, height: 1058 });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.uiKit.editButton.click();

    await expect(eventPage.uiKit.textLabel(form.set).getLocator).toBeVisible();
    await expect(eventPage.page).toHaveScreenshot([`editingDescription.png`]);
  });

  test('#SBO-T4570 Форма редактирования [Участники]', async ({ eventPage, eventApiMock }) => {
    student = new StudentModel({
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      course: { name: '1 курс', code: '1' },
      group: 'УГ-1644',
    });
    await eventPage.page.setViewportSize({ width: 1100, height: 1058 });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();
    await eventPage.uiKit.editButton.click();

    await expect(eventPage.uiKit.textLabel(form.set).getLocator).toBeVisible();
    await expect(eventPage.page).toHaveScreenshot([`editingParticipants.png`]);
  });

  test('#SBO-T4538 Форма добавления [Участники]', async ({ eventPage, eventApiMock, helper }) => {
    student = new StudentModel({
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      course: { name: '1 курс', code: '1' },
      group: 'УГ-1644',
    });
    const date = helper.getDateInFormat(event.startAt, DateFormat.ddMMyyyy);
    const startAt = helper.getDateInFormat(event.startAt, DateFormat.HHmm);
    const endAt = helper.getDateInFormat(event.endAt, DateFormat.HHmm);

    await eventPage.page.setViewportSize({ width: 1100, height: 1000 });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.uiKit.addButton.click();
    await eventPage.uiKit.titleField.fill(event.title);
    await eventPage.serviceSelect.chooseOption(event.service.name);
    await eventPage.linkField.fill(event.link);
    await eventPage.dateField.fill(date);
    await eventPage.startTimeField.fill(startAt);
    await eventPage.endTimeField.fill(endAt);
    await eventPage.fartherButton.click();

    await expect(eventPage.searchFullNameField.getLocator).toBeVisible();
    await expect(eventPage.page).toHaveScreenshot([`addingParticipants.png`], { fullPage: false });
  });

  test('#SBO-T4582 Виджет «Пригласить» в форме редактирования [Участники]', async ({ eventPage, eventApiMock }) => {
    student = new StudentModel({
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      course: { name: '1 курс', code: '1' },
      group: 'УГ-1644',
    });
    await eventPage.page.setViewportSize({ width: 1100, height: 1000 });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();
    await eventPage.tabParticipantListButton.click();
    await eventPage.uiKit.editButton.click();

    await expect(eventPage.uiKit.textLabel(form.set).getLocator).toBeVisible();
    await eventPage.inviteButton.click();

    await expect(eventPage.searchFullNameField.getLocator).toBeVisible();
    await expect(eventPage.page).toHaveScreenshot([`invitingParticipants.png`], { fullPage: false });
  });

  test('#SBO-T4512 Функциональность вкладки', async ({ eventPage, eventApiMock }) => {
    event = new EventModel({
      isPublished: false,
      title: 'Название события',
      link: 'https://jazz.sber.ru/d02km4?psw=OB0AAh1UBkRRDQcUQkARV14HGg',
      place: 'Менделеевская линия, 2, Санкт-Петербург',
      description: 'Активизация научной и инновационной деятельности педагогических работников.',
      startAt: new Date(2040, 0, 3, 2, 0),
      endAt: new Date(2040, 0, 3, 4, 2),
    });
    await eventApiMock.mockListEvents(EventAnswer.SUCCESS, event);

    await eventPage.openEduPanEvents();
    await expect(eventPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await eventPage.setViewportBlockSize();
    await expect(eventPage.eventsForm.getLocator).toHaveScreenshot([`listEvents.png`]);
  });

  test('#SBO-T4512 Отображение заглушки при некорректной фильтрации', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockListEvents(EventAnswer.INCORRECT_FILTERING, event);

    await eventPage.openEduPanEvents();
    await expect(eventPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await eventPage.pastEventTab.click();
    await eventPage.eventKindFilterSelect.chooseOption(event.kind.name);

    await expect(eventPage.incorrectFilteringEventsHeaderStub.getLocator).toBeVisible();
    await expect(eventPage.incorrectFilteringTextStub.getLocator).toBeVisible();
  });

  test('#SBO-T4514 Фильтрация событий', async ({ eventPage, eventApiMock }) => {
    await eventApiMock.mockListEvents(EventAnswer.SUCCESS, event);

    await eventPage.openEduPanEvents();
    await expect(eventPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await expect(eventPage.eventBlock(event.title).getLocator).toBeVisible();
    await eventPage.pastEventTab.click();
    await expect(eventPage.eventBlock(event.title).getLocator).toBeVisible();
    await eventPage.eventKindFilterSelect.chooseOption(event.kind.name);
    await expect(eventPage.eventBlock(event.title).getLocator).toBeVisible();
  });

  test('#SBO-T7584 Посмотреть запись «Webinar.ru»', async ({ academyInit, eventPage, eventApiMock }) => {
    event = new EventModel({ service: { name: 'Webinar.ru', code: 'webinar' } });
    await eventApiMock.mockSettingEvents(EventAnswer.SUCCESS, event, student);

    await eventPage.openEduPanEvents();
    await eventPage.eventBlock(event.title).click();

    await expect(eventPage.uiKit.textLabel(event.title).getLocator).toBeVisible();
    await expect(eventPage.recordBadgeBlock('Запись события доступна').getLocator).toBeVisible();
    await eventPage.recordLookButton.click();
    const [recordPage] = await Promise.all([await academyInit.context.waitForEvent('page')]);
    await expect(recordPage).toHaveURL(/events\.webinar\.ru|record-new/);
  });
});
