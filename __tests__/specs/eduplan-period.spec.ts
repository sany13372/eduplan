/* eslint-disable no-await-in-loop,@typescript-eslint/no-unused-expressions */
import { expect } from '@playwright/test';

import { test } from '../fixtures/academy.fixtures';
import { PeriodModel } from '../utils/data/model/period.model';
import { DateFormat } from '../utils/data/model/enums/dateFormat';
import { PeriodAnswer } from '../utils/data/enum/period.answer.enum';
import { PERIOD_VALIDATION_DATA } from '../utils/data/validation/period.validation';

let period: PeriodModel;
const dataUpdated = `Данные успешно обновлены`;
const formName = { add: 'Добавление периода', view: 'Периоды части плана обучения', edit: 'Редактирование периода' };

test.describe('|Планы обучения| Периоды', () => {
  test.beforeEach(async () => {
    period = new PeriodModel();
  });

  test('#SBO-T6946 Добавление периода', async ({ planViewPage, planApiMock, helper }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.WITHOUT_PERIOD);
    const startDateFormat = helper.getDateInFormat(period.startDate, DateFormat.ddMMyyyy);
    const endDateFormat = helper.getDateInFormat(period.endDate, DateFormat.ddMMyyyy);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.addButton.click();
    await expect(planViewPage.periodDrawer.textBlock(formName.add).getLocator).toBeVisible();

    await planViewPage.periodDrawer.showTypeSelect.chooseOption(period.type);
    await planViewPage.periodDrawer.titleField.fill(period.title);
    await planViewPage.periodDrawer.startDateField.fill(startDateFormat);
    await planViewPage.periodDrawer.endDateField.fill(endDateFormat);
    await planViewPage.periodDrawer.saveButton.click();

    await expect(planViewPage.uiKit.toastBlock(dataUpdated).getLocator).toBeVisible();
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
  });

  test('#SBO-T6949 Редактирование периода', async ({ planViewPage, planApiMock, helper, generator }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.SUCCESS, period);
    const newPeriod = new PeriodModel({
      startDate: generator.date({ month: 2, day: 1 }),
      endDate: generator.date({ month: 2, day: 7 }),
      type: 'Период каникул',
    });
    const startDateFormat = helper.getDateInFormat(newPeriod.startDate, DateFormat.ddMMyyyy);
    const endDateFormat = helper.getDateInFormat(newPeriod.endDate, DateFormat.ddMMyyyy);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Редактировать');
    await planViewPage.periodDrawer.showTypeSelect.chooseOption(newPeriod.type);
    await planViewPage.periodDrawer.titleField.fill(newPeriod.title);
    await planViewPage.periodDrawer.startDateField.fillHighlighted(startDateFormat);
    await planViewPage.periodDrawer.endDateField.fillHighlighted(endDateFormat);
    await planViewPage.periodDrawer.saveButton.click();

    await expect(planViewPage.uiKit.toastBlock(dataUpdated).getLocator).toBeVisible();
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
  });

  test('#SBO-T6952 Удаление периода', async ({ planViewPage, planApiMock }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.SUCCESS, period);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Удалить');
    await planViewPage.modal.removeButton.click();

    await expect(planViewPage.uiKit.toastBlock(dataUpdated).getLocator).toBeVisible();
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
  });

  test('#SBO-T6940 Добавление периода, навигация', async ({ planViewPage, planApiMock }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.WITHOUT_PERIOD);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    for (const component of [planViewPage.periodDrawer.cancelButton, planViewPage.periodDrawer.closeIconButton]) {
      await planViewPage.periodDrawer.addButton.click();
      await expect(planViewPage.periodDrawer.textBlock(formName.add).getLocator).toBeVisible();

      await component.click();
      await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

      await planViewPage.periodDrawer.addButton.click();
      await expect(planViewPage.periodDrawer.textBlock(formName.add).getLocator).toBeVisible();
      await planViewPage.periodDrawer.titleField.fill(period.title);
      await component.click();
      await planViewPage.modal.stayButton.click();
      await expect(planViewPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await planViewPage.modal.closeButton.click();
      await expect(planViewPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await planViewPage.modal.exitButton.click();
      await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
    }
  });

  test('#SBO-T8005 Редактирование периода, навигация', async ({ planViewPage, planApiMock }) => {
    const newPeriod = new PeriodModel();
    await planApiMock.mockPeriodPlan(PeriodAnswer.SUCCESS, period);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    for (const component of [planViewPage.periodDrawer.cancelButton, planViewPage.periodDrawer.closeIconButton]) {
      await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Редактировать');
      await expect(planViewPage.periodDrawer.textBlock(formName.edit).getLocator).toBeVisible();

      await component.click();
      await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

      await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Редактировать');
      await expect(planViewPage.periodDrawer.textBlock(formName.edit).getLocator).toBeVisible();
      await planViewPage.periodDrawer.titleField.fill(newPeriod.title);
      await component.click();
      await planViewPage.modal.stayButton.click();
      await expect(planViewPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await planViewPage.modal.closeButton.click();
      await expect(planViewPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await planViewPage.modal.exitButton.click();
      await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
    }
  });

  test('#SBO-T8004 Отображение периода, навигация', async ({ planViewPage, planApiMock }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.SUCCESS, period);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Удалить');
    await planViewPage.modal.cancelButton.click();
    await expect(planViewPage.modal.block.getLocator).toBeHidden();

    await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Удалить');
    await planViewPage.modal.closeButton.click();
    await expect(planViewPage.modal.block.getLocator).toBeHidden();

    await planViewPage.periodDrawer.closeIconButton.click();
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeHidden();
  });

  test('#SBO-T6948 Отображение формы добавления периода', async ({ planViewPage, planApiMock }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.WITHOUT_PERIOD);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
    await planViewPage.periodDrawer.addButton.click();

    await expect(planViewPage.periodDrawer.textBlock(formName.add).getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.infoPanelBlock('1 семестр').getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.closeIconButton.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.showTypeSelect.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.titleField.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.startDateField.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.endDateField.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.cancelButton.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.saveButton.getLocator).toBeDisabled();
  });

  test('#SBO-T8006 Отображение формы редактирования периода', async ({ planViewPage, planApiMock }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.SUCCESS, period);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
    await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Редактировать');

    await expect(planViewPage.periodDrawer.textBlock(formName.edit).getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.infoPanelBlock('1 семестр').getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.closeIconButton.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.showTypeSelect.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.titleField.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.startDateField.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.endDateField.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.cancelButton.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.saveButton.getLocator).toBeDisabled();
  });

  test('#SBO-T8007 Отображение формы просмотра периода', async ({ planViewPage, planApiMock, helper }) => {
    await planApiMock.mockPeriodPlan(PeriodAnswer.SUCCESS, period);
    const startDate = helper.getDateInFormat(period.startDate, DateFormat.ddMMyyyy);
    const endDate = helper.getDateInFormat(period.endDate, DateFormat.ddMMyyyy);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');

    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.infoPanelBlock('1 семестр').getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.closeIconButton.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.addButton.getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.periodKindBlock(period.title, period.type).getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.periodDateBlock(period.title, startDate).getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.periodDateBlock(period.title, endDate).getLocator).toBeVisible();
    await expect.soft(planViewPage.periodDrawer.periodAction(period.title).getLocator).toBeVisible();
  });

  PERIOD_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T6950 Добавление периода, валидация «${obj.name}»`, async ({ planViewPage, planApiMock }) => {
      await planApiMock.mockPeriodPlan(PeriodAnswer.WITHOUT_PERIOD);

      await planViewPage.open();
      await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
      await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

      await planViewPage.periodDrawer.addButton.click();
      await expect(planViewPage.periodDrawer.textBlock(formName.add).getLocator).toBeVisible();

      obj.kind?.value && (await planViewPage.periodDrawer.showTypeSelect.chooseOption(obj.kind.value));
      await planViewPage.periodDrawer.titleField.fill(obj.title.value);
      await planViewPage.periodDrawer.startDateField.manualFill(obj.startDate.value);
      await planViewPage.periodDrawer.titleField.setFocus();
      await planViewPage.periodDrawer.endDateField.manualFill(obj.endDate.value);
      await planViewPage.periodDrawer.titleField.setFocus();
      await planViewPage.periodDrawer.saveButton.click();

      obj.kind?.message &&
        (await expect(planViewPage.periodDrawer.textBlock(obj.kind.message).getLocator).toBeVisible());
      obj.title?.message &&
        (await expect(planViewPage.periodDrawer.textBlock(obj.title.message).getLocator).toBeVisible());
      obj.startDate?.message &&
        (await expect(planViewPage.periodDrawer.textBlock(obj.startDate.message).getLocator).toBeVisible());
      obj.endDate?.message &&
        (await expect(planViewPage.periodDrawer.textBlock(obj.endDate.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' &&
        (await expect(planViewPage.uiKit.toastBlock(dataUpdated).getLocator).toBeVisible());
    });
  });

  test('#SBO-T6950 Добавление периода, валидация «Дата начала раньше старта плана»', async ({
    planViewPage,
    planApiMock,
    helper,
  }) => {
    const message = 'Дата начала периода не должна быть раньше даты начала обучения по плану';
    await planApiMock.mockPeriodPlan(PeriodAnswer.PERIOD_EARLIER);
    const startDateFormat = helper.getDateInFormat(period.startDate, DateFormat.ddMMyyyy);
    const endDateFormat = helper.getDateInFormat(period.endDate, DateFormat.ddMMyyyy);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.addButton.click();
    await expect(planViewPage.periodDrawer.textBlock(formName.add).getLocator).toBeVisible();

    await planViewPage.periodDrawer.showTypeSelect.chooseOption(period.type);
    await planViewPage.periodDrawer.titleField.fill(period.title);
    await planViewPage.periodDrawer.startDateField.fill(startDateFormat);
    await planViewPage.periodDrawer.endDateField.fill(endDateFormat);
    await planViewPage.periodDrawer.saveButton.click();

    await expect(planViewPage.periodDrawer.textBlock(message).getLocator).toBeVisible();
  });

  test('#SBO-T6950 Добавление периода, валидация «Уникальное название» [https://jira.pcbltools.ru/jira/browse/SU-1971]', async ({
    planViewPage,
    planApiMock,
    helper,
  }) => {
    test.fail();
    const message = 'Период с таким названием для части плана обучения уже существует.';
    await planApiMock.mockPeriodPlan(PeriodAnswer.PERIOD_EXIST);
    const startDateFormat = helper.getDateInFormat(period.startDate, DateFormat.ddMMyyyy);
    const endDateFormat = helper.getDateInFormat(period.endDate, DateFormat.ddMMyyyy);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.addButton.click();
    await expect(planViewPage.periodDrawer.textBlock(formName.add).getLocator).toBeVisible();

    await planViewPage.periodDrawer.showTypeSelect.chooseOption(period.type);
    await planViewPage.periodDrawer.titleField.fill(period.title);
    await planViewPage.periodDrawer.startDateField.fill(startDateFormat);
    await planViewPage.periodDrawer.endDateField.fill(endDateFormat);
    await planViewPage.periodDrawer.saveButton.click();

    await expect(planViewPage.periodDrawer.textBlock(message).getLocator).toBeVisible();
  });

  PERIOD_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T6951 Редактирование периода, валидация «${obj.name}»`, async ({ planViewPage, planApiMock }) => {
      await planApiMock.mockPeriodPlan(PeriodAnswer.SUCCESS, period);

      await planViewPage.open();
      await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
      await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

      await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Редактировать');
      await expect(planViewPage.periodDrawer.textBlock(formName.edit).getLocator).toBeVisible();

      await planViewPage.periodDrawer.titleField.fill(obj.title.value);
      await planViewPage.periodDrawer.startDateField.manualFill(obj.startDate.value);
      await planViewPage.periodDrawer.titleField.setFocus();
      await planViewPage.periodDrawer.endDateField.manualFill(obj.endDate.value);
      await planViewPage.periodDrawer.titleField.setFocus();
      await planViewPage.periodDrawer.saveButton.click();

      obj.title?.message &&
        (await expect(planViewPage.periodDrawer.textBlock(obj.title.message).getLocator).toBeVisible());
      obj.startDate?.message &&
        (await expect(planViewPage.periodDrawer.textBlock(obj.startDate.message).getLocator).toBeVisible());
      obj.endDate?.message &&
        (await expect(planViewPage.periodDrawer.textBlock(obj.endDate.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' &&
        (await expect(planViewPage.uiKit.toastBlock(dataUpdated).getLocator).toBeVisible());
    });
  });

  test('#SBO-T6951 Редактирование периода, валидация «Дата начала раньше старта плана»', async ({
    planViewPage,
    planApiMock,
  }) => {
    const newPeriod = new PeriodModel({ type: 'Период каникул' });
    const message = 'Дата начала периода не должна быть раньше даты начала обучения по плану';
    await planApiMock.mockPeriodPlan(PeriodAnswer.PERIOD_EARLIER, period);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Редактировать');
    await expect(planViewPage.periodDrawer.textBlock(formName.edit).getLocator).toBeVisible();

    await planViewPage.periodDrawer.showTypeSelect.chooseOption(newPeriod.type);
    await planViewPage.periodDrawer.titleField.fill(newPeriod.title);
    await planViewPage.periodDrawer.saveButton.click();

    await expect(planViewPage.periodDrawer.textBlock(message).getLocator).toBeVisible();
  });

  test('#SBO-T6951 Редактирование периода, валидация «Уникальное название» [https://jira.pcbltools.ru/jira/browse/SU-1971]', async ({
    planViewPage,
    planApiMock,
  }) => {
    test.fail();
    const newPeriod = new PeriodModel({ type: 'Период каникул' });
    const message = 'Период с таким названием для части плана обучения уже существует.';
    await planApiMock.mockPeriodPlan(PeriodAnswer.PERIOD_EXIST, period);

    await planViewPage.open();
    await planViewPage.activityActionButton(1).chooseOption('Настроить периоды');
    await expect(planViewPage.periodDrawer.textBlock(formName.view).getLocator).toBeVisible();

    await planViewPage.periodDrawer.periodAction(period.title).chooseOption('Редактировать');
    await expect(planViewPage.periodDrawer.textBlock(formName.edit).getLocator).toBeVisible();

    await planViewPage.periodDrawer.showTypeSelect.chooseOption(newPeriod.type);
    await planViewPage.periodDrawer.titleField.fill(newPeriod.title);
    await planViewPage.periodDrawer.saveButton.click();

    await expect(planViewPage.periodDrawer.textBlock(message).getLocator).toBeVisible();
  });
});
