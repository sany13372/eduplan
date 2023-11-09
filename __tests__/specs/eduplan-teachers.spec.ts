/* eslint-disable no-await-in-loop */
import { expect } from '@playwright/test';

import { test } from '../fixtures/academy.fixtures';
import { EmployeeModel } from '../utils/data/model/employee.model';
import { ActivityModel } from '../utils/data/model/activity.model';
import { TeacherAnswer } from '../utils/data/enum/teacher.answer.enum';

let employee: EmployeeModel;
let activity: ActivityModel;

test.describe('|Планы обучения| Преподаватели', () => {
  test.beforeEach(() => {
    employee = new EmployeeModel({ isPps: true });
    activity = new ActivityModel({});
  });

  test('#SBO-T5767 Добавить преподавателей на занятие', async ({ teachersPage, teacherApiMock }) => {
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITHOUT_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await teachersPage.addTeacher(activity.title).click();
    await teachersPage.addTeacherFromList(employee.email).click();
    await teachersPage.uiKit.saveButton.click();

    await expect(teachersPage.alertAddingTeacherBlock.getLocator).toBeVisible();
    await expect(teachersPage.teacherCardBlock(activity.title, employee.email).getLocator).toBeVisible();
  });

  test('#SBO-T5773 Редактировать список преподавателей на занятие', async ({ teachersPage, teacherApiMock }) => {
    const email = 'staff0001@sber.ru';
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITH_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await teachersPage.addTeacher(activity.title).click();
    await teachersPage.addTeacherFromList(email).click();
    await teachersPage.uiKit.saveButton.click();

    await expect(teachersPage.alertAddingTeacherBlock.getLocator).toBeVisible();
    await expect(teachersPage.teacherCardBlock(activity.title, email).getLocator).toBeVisible();
  });

  test('#SBO-T5770 Удалить преподавателя с занятия', async ({ teachersPage, teacherApiMock }) => {
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITH_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await teachersPage.deleteTeacher(activity.title, employee.email).click();
    await teachersPage.modal.removeButton.click();

    await expect(teachersPage.alertAddingTeacherBlock.getLocator).toBeVisible();
    await expect(teachersPage.teacherCardBlock(activity.title, employee.email).getLocator).toBeHidden();
  });

  test('#SBO-T5765 Вид вкладки без добавленных преподавателей', async ({ teachersPage, teacherApiMock }) => {
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITHOUT_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await expect(teachersPage.teacherHeaderStub.getLocator).toBeVisible();
    await expect(teachersPage.teacherTextStub.getLocator).toBeVisible();
  });

  test('#SBO-T5771 Проверить отсутствие кнопки «Добавить» если добавлены все преподаватели', async ({
    teachersPage,
    teacherApiMock,
  }) => {
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITHOUT_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await teachersPage.addTeacher(activity.title).click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeVisible();
    await teachersPage.uiKit.labelCheckbox.clickOnAll();
    await teachersPage.uiKit.saveButton.click();

    await expect(teachersPage.alertAddingTeacherBlock.getLocator).toBeVisible();
    await expect(teachersPage.addTeacher(activity.title).getLocator).toBeDisabled();
  });

  test('#SBO-T5764 Удаление преподавателей, навигация', async ({ teachersPage, teacherApiMock }) => {
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITH_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();

    await teachersPage.deleteTeacher(activity.title, employee.email).click();
    await teachersPage.modal.cancelButton.click();
    await expect(teachersPage.modal.block.getLocator).toBeHidden();

    await teachersPage.deleteTeacher(activity.title, employee.email).click();
    await teachersPage.modal.closeButton.click();
    await expect(teachersPage.modal.block.getLocator).toBeHidden();
  });

  test('#SBO-T5772 Экран добавления преподавателей на занятие, навигация', async ({ teachersPage, teacherApiMock }) => {
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITHOUT_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await teachersPage.addTeacher(activity.title).click();
    await teachersPage.addingTeachersWidgetCrossButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeHidden();
    await teachersPage.addTeacher(activity.title).click();
    await teachersPage.addTeacherFromList(employee.email).click();
    await teachersPage.addingTeachersWidgetCrossButton.click();
    await teachersPage.modal.stayButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeVisible();
    await teachersPage.addingTeachersWidgetCrossButton.click();
    await teachersPage.modal.closeButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeVisible();
    await teachersPage.addingTeachersWidgetCrossButton.click();
    await teachersPage.modal.yesCloseButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeHidden();

    await teachersPage.addTeacher(activity.title).click();
    await teachersPage.addingTeachersWidgetCancelButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeHidden();
    await teachersPage.addTeacher(activity.title).click();
    await teachersPage.addTeacherFromList(employee.email).click();
    await teachersPage.addingTeachersWidgetCancelButton.click();
    await teachersPage.modal.stayButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeVisible();
    await teachersPage.addingTeachersWidgetCancelButton.click();
    await teachersPage.modal.closeButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeVisible();
    await teachersPage.addingTeachersWidgetCancelButton.click();
    await teachersPage.modal.yesCloseButton.click();
    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeHidden();
  });

  test('#SBO-T5768 Экран добавления преподавателей на занятие', async ({ teachersPage, teacherApiMock }) => {
    employee = new EmployeeModel({ firstName: 'Игорь', lastName: 'Пол', middleName: 'Том', email: 'igor@sber.com' });
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITHOUT_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await teachersPage.addTeacher(activity.title).click();

    await expect(teachersPage.addTeacherFromList(employee.email).getLocator).toBeVisible();
    await expect(teachersPage.addingTeachersWidget.getLocator).toHaveScreenshot([`addingTeachers.png`]);
  });

  test('#SBO-T5766 Вид вкладки с мероприятиями и преподавателями', async ({ teachersPage, teacherApiMock }) => {
    activity = new ActivityModel({ title: 'Ресурсоемкость при проектирование БД' });
    employee = new EmployeeModel({ firstName: 'Игорь', lastName: 'Пол', middleName: 'Том', email: 'igor@sber.com' });
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITH_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();
    await expect(teachersPage.teacherCardBlock(activity.title, employee.email).getLocator).toBeVisible();
    await teachersPage.setViewportBlockSize();
    await expect(teachersPage.teachersForm.getLocator).toHaveScreenshot([`listTeachers.png`]);
  });

  test('#SBO-T6931 Подняться наверх в списке преподавателей', async ({ teachersPage, teacherApiMock }) => {
    await teacherApiMock.mockTeachersTab(TeacherAnswer.WITH_DESIGNATED_TEACHERS, employee, activity);

    await teachersPage.openEduPlanTeachers();

    await teachersPage.teacherCardBlock(activity.title, employee.email).setFocus();
    await teachersPage.page.keyboard.down('End');
    await expect(teachersPage.uiKit.climbUpButton.getLocator).toBeVisible();
    await teachersPage.uiKit.climbUpButton.click();
    await expect(teachersPage.teacherCardBlock(activity.title, employee.email).getLocator).toBeVisible();
    await expect(teachersPage.uiKit.climbUpButton.getLocator).toBeHidden();
  });
});
