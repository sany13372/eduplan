/* eslint-disable no-await-in-loop,@typescript-eslint/no-unused-expressions */
import { expect } from '@playwright/test';

import { LessonModel } from '../utils/data/model/lesson.model';
import { test } from '../fixtures/academy.fixtures';
import { ThemeModel } from '../utils/data/model/theme.model';
import { LessonAnswer } from '../utils/data/enum/lesson.answer.enum';
import { LESSON_VALIDATION_DATA } from '../utils/data/validation/lesson.validation';

let model: { lesson: LessonModel; theme: ThemeModel };
const form = { add: 'Добавление занятия', edit: 'Редактирование занятия' };
const toast = { add: 'Занятие добавлено', edit: 'Изменения сохранены' };

test.describe('|Планы обучения| Мероприятия [Занятия]', () => {
  test.beforeEach(async () => {
    model = { lesson: new LessonModel(), theme: new ThemeModel() };
  });

  test('#SBO-T7051 Создать занятие', async ({ lessonPage, lessonApiMock }) => {
    await lessonApiMock.mockAddingLesson(model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.addLessonButton(model.theme.title).click();
    await expect(lessonPage.lessonDrawer.headerBlock(form.add).getLocator).toBeVisible();

    await lessonPage.lessonDrawer.titleField.fill(model.lesson.title);
    await lessonPage.lessonDrawer.eduKindSelect.chooseOption(model.lesson.kind.title);
    await lessonPage.lessonDrawer.saveButton.click();

    await expect(lessonPage.lessonDrawer.headerBlock(form.add).getLocator).toBeHidden();
    await expect(lessonPage.uiKit.toastBlock(toast.add).getLocator).toBeVisible();
  });

  test('#SBO-T7055 Редактировать занятие', async ({ lessonPage, lessonApiMock }) => {
    model.lesson.isAllowRegistration = false;
    await lessonApiMock.mockEditingLesson(model.lesson, model.theme);
    const newLessonModel = new LessonModel();

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();
    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Редактировать');
    await expect(lessonPage.lessonDrawer.headerBlock(form.edit).getLocator).toBeVisible();

    await expect(lessonPage.lessonDrawer.eduKindDisabledButton.getLocator).toBeDisabled();
    await lessonPage.lessonDrawer.titleField.fill(newLessonModel.title);
    await lessonPage.lessonDrawer.saveButton.click();

    await expect(lessonPage.lessonDrawer.headerBlock(form.edit).getLocator).toBeHidden();
    await expect(lessonPage.uiKit.toastBlock(toast.edit).getLocator).toBeVisible();
  });

  test('#SBO-T7062 Удалить занятие', async ({ lessonPage, lessonApiMock }) => {
    await lessonApiMock.mockSettingsLesson(LessonAnswer.SUCCESS, model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();
    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Удалить');
    await lessonPage.modal.removeButton.click();

    await expect(lessonPage.themeStubBlock(model.theme.title).getLocator).toBeVisible();
  });

  test('#SBO-T7053 Вид вкладки без тем', async ({ lessonPage, lessonApiMock }) => {
    await lessonApiMock.mockListLesson(LessonAnswer.WITHOUT_THEMES, model.lesson, model.theme);

    await lessonPage.openLesson();
    await expect(lessonPage.lessonHeaderStub.getLocator).toBeVisible();
    await expect(lessonPage.lessonTextStub.getLocator).toBeVisible();
  });

  test('#SBO-T7060 Согласовать занятие', async ({ lessonPage, lessonApiMock }) => {
    model.lesson.isAllowRegistration = false;
    await lessonApiMock.mockSettingsLesson(LessonAnswer.SUCCESS, model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();

    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Согласовать');
    const expectResult1 = [model.lesson.title, model.lesson.kind.title, 'Согласовано'];
    expect(await lessonPage.lessonInfoBlock(model.theme.title, model.lesson.title).getAllCells()).toEqual(
      expectResult1,
    );

    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Отменить согласование');
    const expectResult2 = [model.lesson.title, model.lesson.kind.title, 'Не согласовано'];
    expect(await lessonPage.lessonInfoBlock(model.theme.title, model.lesson.title).getAllCells()).toEqual(
      expectResult2,
    );
  });

  test('#SBO-T7061 Согласовать занятие без контента', async ({ lessonPage, lessonApiMock }) => {
    const modal = {
      header: 'Ошибка',
      text: 'Чтобы согласовать занятие, выберите пункт «Посмотреть» и добавьте контент в конструкторе',
    };
    model.lesson.isAllowRegistration = false;
    model.lesson.isContentAdded = false;
    await lessonApiMock.mockSettingsLesson(LessonAnswer.SUCCESS, model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();
    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Согласовать');

    await expect(lessonPage.modal.headerBlock(modal.header).getLocator).toBeVisible();
    await expect(lessonPage.modal.textBlock(modal.text).getLocator).toBeVisible();

    await lessonPage.modal.okayButton.click();
    await expect(lessonPage.modal.block.getLocator).toBeHidden();
  });

  test('#SBO-T7067 Отменить согласование у занятия с опубликованной реализацией [https://jira.pcbltools.ru/jira/browse/SU-2211]', async ({
    lessonPage,
    lessonApiMock,
  }) => {
    test.fail();
    const modal = {
      header: 'Ошибка',
      text: 'Чтобы отменить согласование занятия, необходимо снять его с публикации. Перейдите в «Настройки обучения» и нажмите на кнопку «Снять с публикации»',
    };
    await lessonApiMock.mockSettingsLesson(LessonAnswer.LESSON_STREAM_IS_RUNNING, model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();
    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Отменить согласование');

    await expect(lessonPage.modal.headerBlock(modal.header).getLocator).toBeVisible();
    await expect(lessonPage.modal.textBlock(modal.text).getLocator).toBeVisible();

    await lessonPage.modal.okayButton.click();
    await expect(lessonPage.modal.headerBlock(modal.header).getLocator).toBeHidden();
  });

  test('#SBO-T7063 Удалить занятие с назначенными обучающимися', async ({ lessonPage, lessonApiMock }) => {
    const modal = {
      header: 'Ошибка',
      text: 'Чтобы удалить занятие, перейдите в «Настройки обучения» и отмените запись обучающихся на занятие',
    };
    await lessonApiMock.mockSettingsLesson(LessonAnswer.LESSON_WITH_STUDENTS, model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();
    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Удалить');
    await lessonPage.modal.removeButton.click();

    await expect(lessonPage.modal.headerBlock(modal.header).getLocator).toBeVisible();
    await expect(lessonPage.modal.textBlock(modal.text).getLocator).toBeVisible();

    await lessonPage.modal.okayButton.click();
    await expect(lessonPage.modal.headerBlock(modal.header).getLocator).toBeHidden();
  });

  test('#SBO-T7058 Создать занятие, навигация', async ({ lessonPage, lessonApiMock }) => {
    await lessonApiMock.mockAddingLesson(model.lesson, model.theme);

    await lessonPage.openLesson();
    for (const component of [lessonPage.lessonDrawer.cancel2Button, lessonPage.lessonDrawer.closeIconButton]) {
      await lessonPage.addLessonButton(model.theme.title).click();
      await component.click();
      await expect(lessonPage.addLessonButton(model.theme.title).getLocator).toBeVisible();

      await lessonPage.addLessonButton(model.theme.title).click();
      await lessonPage.lessonDrawer.titleField.fill(model.lesson.title);
      await component.click();
      await lessonPage.modal.stayButton.click();
      await expect(lessonPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await lessonPage.modal.closeButton.click();
      await expect(lessonPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await lessonPage.modal.exitButton.click();
      await expect(lessonPage.addLessonButton(model.theme.title).getLocator).toBeVisible();
    }
  });

  test('#SBO-T7059 Редактирование занятие, навигация', async ({ lessonPage, lessonApiMock }) => {
    await lessonApiMock.mockEditingLesson(model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();
    for (const component of [lessonPage.lessonDrawer.cancel2Button, lessonPage.lessonDrawer.closeIconButton]) {
      await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Редактировать');
      await component.click();
      await expect(lessonPage.addLessonButton(model.theme.title).getLocator).toBeVisible();

      await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Редактировать');
      await lessonPage.lessonDrawer.titleField.fill('');
      await component.click();
      await lessonPage.modal.stayButton.click();
      await expect(lessonPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await lessonPage.modal.closeButton.click();
      await expect(lessonPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await lessonPage.modal.exitButton.click();
      await expect(lessonPage.addLessonButton(model.theme.title).getLocator).toBeVisible();
    }
  });

  test('#SBO-T7064 Удаление занятия, навигация', async ({ lessonPage, lessonApiMock }) => {
    await lessonApiMock.mockSettingsLesson(LessonAnswer.SUCCESS, model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton(model.theme.title).click();

    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Удалить');
    await lessonPage.modal.cancelButton.click();
    await expect(lessonPage.modal.block.getLocator).toBeHidden();

    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Удалить');
    await lessonPage.modal.closeButton.click();
    await expect(lessonPage.modal.block.getLocator).toBeHidden();

    await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Удалить');
    await lessonPage.modal.removeButton.click();
    await expect(lessonPage.modal.block.getLocator).toBeHidden();
  });

  LESSON_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T7056 Создать занятие, валидация «${obj.name}»`, async ({ lessonPage, lessonApiMock }) => {
      await lessonApiMock.mockAddingLesson(model.lesson, model.theme);

      await lessonPage.openLesson();
      await lessonPage.addLessonButton(model.theme.title).click();

      await expect(lessonPage.lessonDrawer.headerBlock(form.add).getLocator).toBeVisible();
      await lessonPage.lessonDrawer.titleField.fill(obj.title.value);
      obj.kind?.value && (await lessonPage.lessonDrawer.eduKindSelect.chooseOption(obj.kind.value));
      await lessonPage.lessonDrawer.saveButton.click();

      obj.title?.message && (await expect(lessonPage.uiKit.textLabel(obj.title.message).getLocator).toBeVisible());
      obj.kind?.message && (await expect(lessonPage.uiKit.textLabel(obj.kind.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' &&
        (await expect(lessonPage.uiKit.toastBlock(toast.add).getLocator).toBeVisible());
    });
  });

  LESSON_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T7057 Редактирование занятие, валидация «${obj.name}»`, async ({ lessonPage, lessonApiMock }) => {
      await lessonApiMock.mockEditingLesson(model.lesson, model.theme);

      await lessonPage.openLesson();
      await lessonPage.themeAccordionButton(model.theme.title).click();
      await lessonPage.lessonSettingSelect(model.theme.title, model.lesson.title).chooseOption('Редактировать');

      await expect(lessonPage.lessonDrawer.headerBlock(form.edit).getLocator).toBeVisible();
      await lessonPage.lessonDrawer.titleField.fill(obj.title.value);
      await lessonPage.lessonDrawer.saveButton.click();

      obj.title?.message && (await expect(lessonPage.uiKit.textLabel(obj.title.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' &&
        (await expect(lessonPage.uiKit.toastBlock(toast.edit).getLocator).toBeVisible());
    });
  });

  test('#SBO-T7054 Вид вкладки с добавленными темами, занятиями, скормом etc.', async ({
    lessonPage,
    lessonApiMock,
  }) => {
    model.theme.title = 'Тема 01. Введение';
    await lessonApiMock.mockListLesson(LessonAnswer.SUCCESS, model.lesson, model.theme);

    await lessonPage.openLesson();
    await lessonPage.themeAccordionButton('Тема 02. Анализ, синтез и логика').click();

    await lessonPage.setViewportBlockSize();
    await expect(lessonPage.lessonForm.getLocator).toHaveScreenshot([`listLessons.png`]);
  });
});
