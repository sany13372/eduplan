/* eslint-disable no-await-in-loop,@typescript-eslint/no-unused-expressions */
import { expect } from '@playwright/test';

import { test } from '../fixtures/academy.fixtures';
import { StudentModel } from '../utils/data/model/student.model';
import { StudyGroupModel } from '../utils/data/model/study-group.model';
import { DateFormat } from '../utils/data/model/enums/dateFormat';
import { StudentAnswer } from '../utils/data/enum/student.answer.enum';
import { GROUP_VALIDATION_DATA } from '../utils/data/validation/group.validation';
import { STUDENT_VALIDATION_DATA } from '../utils/data/validation/student.validation';
import { ProgramModel } from '../utils/data/model/program.model';
import { PlanModel } from '../utils/data/model/plan.model';

let student: StudentModel;
let group: StudyGroupModel;

const withoutGroupTitle = 'Без группы';
const form = {
  list: 'Обучающиеся',
  toast: 'Данные успешно обновлены',
  group: { add: 'Добавление группы', edit: 'Редактирование группы' },
  student: {
    add: 'Добавление обучающегося',
    setting: 'Добавление обучающихся',
    edit: 'Редактирование данных обучающегося',
  },
};

test.describe('|Планы обучения| Обучающиеся', () => {
  test.beforeEach(() => {
    student = new StudentModel({});
    group = new StudyGroupModel();
  });

  test('#SBO-T6665 Добавить группу', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockAddGroup(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.actionSelect.chooseOption('Добавить группу');
    await expect(studentsPage.groupDrawer.headerBlock(form.group.add).getLocator).toBeVisible();

    await studentsPage.groupDrawer.showGroupTypeSelect.chooseOption(group.groupType.name);
    await studentsPage.groupDrawer.titleField.fill(group.title);
    await studentsPage.groupDrawer.saveButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.groupDrawer.headerBlock(form.group.add).getLocator).toBeHidden();
  });

  test('#SBO-T6697 Добавить обучающегося', async ({ studentsPage, studentApiMock, helper }) => {
    await studentApiMock.mockAddStudent(StudentAnswer.SUCCESS, group, student);
    const birthDateFormat = helper.getDateInFormat(student.birthDate, DateFormat.yyyyMMdd);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.actionSelect.chooseOption('Добавить обучающегося');
    await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeVisible();
    await studentsPage.studentDrawer.emailField.fill(student.email);
    await studentsPage.studentDrawer.lastNameField.fill(student.lastName);
    await studentsPage.studentDrawer.firstNameField.fill(student.firstName);
    await studentsPage.studentDrawer.middleNameField.fill(student.middleName);
    await studentsPage.studentDrawer.birthDateField.fill(birthDateFormat);
    await studentsPage.studentDrawer.sexRadioButton(student.gender.name).click();
    await studentsPage.studentDrawer.snilsField.fill(student.snilsNumber);
    await studentsPage.studentDrawer.innField.fill(student.innNumber);
    await studentsPage.studentDrawer.financialSourceSelect.chooseOption(student.financing.title);
    await studentsPage.studentDrawer.personalField.fill(student.personalNumber);
    await studentsPage.studentDrawer.bookNumberField.fill(student.bookNumber);
    await studentsPage.studentDrawer.studyCourseSelect.chooseOption(student.course.name);
    await studentsPage.studentDrawer.studyGroupSelect.chooseOption(group.title);
    await studentsPage.studentDrawer.saveButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeHidden();
  });

  test('#SBO-T6727 Отредактировать группу', async ({ studentsPage, studentApiMock }) => {
    const editGroup = new StudyGroupModel();
    await studentApiMock.mockSetGroup(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.groupActionSelect(group.title).chooseOption('Редактировать группу');
    await expect(studentsPage.groupDrawer.headerBlock(form.group.edit).getLocator).toBeVisible();

    await studentsPage.groupDrawer.titleField.fill(editGroup.title);
    await studentsPage.groupDrawer.saveButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.groupDrawer.headerBlock(form.group.edit).getLocator).toBeHidden();
  });

  test('#SBO-T6720 Отредактировать обучающегося [https://jira.pcbltools.ru/jira/browse/SU-2052]', async ({
    studentsPage,
    studentApiMock,
    helper,
  }) => {
    test.fail();
    const newStudent = new StudentModel({});
    await studentApiMock.mockSetStudent(group, student);
    const birthDateFormat = helper.getDateInFormat(newStudent.birthDate, DateFormat.yyyyMMdd);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupAccordionButton(group.title).click();
    await studentsPage.groupStudentAction(group.title, student.fullName).chooseOption('Редактировать');

    await expect(studentsPage.studentDrawer.headerBlock(form.student.edit).getLocator).toBeVisible();
    await expect(studentsPage.studentDrawer.emailField.getLocator).toBeDisabled();
    await expect(studentsPage.studentDrawer.studyGroupSelect.getLocator.locator('button')).toBeEnabled();
    await studentsPage.studentDrawer.lastNameField.fill(newStudent.lastName);
    await studentsPage.studentDrawer.firstNameField.fill(newStudent.firstName);
    await studentsPage.studentDrawer.middleNameField.fill(newStudent.middleName);
    await studentsPage.studentDrawer.birthDateField.fill(birthDateFormat);
    await studentsPage.studentDrawer.sexRadioButton(newStudent.gender.name).click();
    await studentsPage.studentDrawer.hasNotSnilsNumberSwitch.click(true);
    await studentsPage.studentDrawer.hasNotInnNumberSwitch.click(true);
    await studentsPage.studentDrawer.financialSourceSelect.chooseOption(newStudent.financing.title);
    await studentsPage.studentDrawer.personalField.fill(newStudent.personalNumber);
    await studentsPage.studentDrawer.bookNumberField.fill(newStudent.bookNumber);
    await studentsPage.studentDrawer.studyCourseSelect.chooseOption(newStudent.course.name);
    await studentsPage.studentDrawer.studyGroupSelect.chooseOption(group.title);
    await studentsPage.studentDrawer.saveButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.studentDrawer.headerBlock(form.student.edit).getLocator).toBeHidden();
  });

  test('#SBO-T6730 Выбрать обучающегося из списка в группе', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockSelectStudent(group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupActionSelect(group.title).chooseOption('Выбрать обучающегося из списка');
    await expect(studentsPage.choseStudentsDrawer.textBlock(form.student.setting).getLocator).toBeVisible();
    await studentsPage.choseStudentsDrawer.chooseStudentSwitch(student.fullName).click();
    await studentsPage.choseStudentsDrawer.saveButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.choseStudentsDrawer.textBlock(form.student.setting).getLocator).toBeHidden();
  });

  test('#SBO-T6728 Добавить нового обучающегося в группу', async ({ studentsPage, studentApiMock, helper }) => {
    await studentApiMock.mockAddStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupActionSelect(group.title).chooseOption('Добавить нового обучающегося');
    await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeVisible();
    await studentsPage.studentDrawer.emailField.fill(student.email);
    await studentsPage.studentDrawer.lastNameField.fill(student.lastName);
    await studentsPage.studentDrawer.firstNameField.fill(student.firstName);
    await studentsPage.studentDrawer.middleNameField.fill(student.middleName);
    await studentsPage.studentDrawer.birthDateField.fill(
      helper.getDateInFormat(student.birthDate, DateFormat.yyyyMMdd),
    );
    await studentsPage.studentDrawer.sexRadioButton(student.gender.name).click();
    await studentsPage.studentDrawer.snilsField.fill(student.snilsNumber);
    await studentsPage.studentDrawer.innField.fill(student.innNumber);
    await studentsPage.studentDrawer.financialSourceSelect.chooseOption(student.financing.title);
    await studentsPage.studentDrawer.personalField.fill(student.personalNumber);
    await studentsPage.studentDrawer.bookNumberField.fill(student.bookNumber);
    await studentsPage.studentDrawer.studyCourseSelect.chooseOption(student.course.name);
    await expect(studentsPage.studentDrawer.studyGroupSelect.getLocator.locator('button')).toBeDisabled();
    await studentsPage.studentDrawer.saveButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeHidden();
  });

  test('#SBO-T6740 Исключить обучающегося из группы', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupAccordionButton(group.title).click();
    await studentsPage.groupStudentAction(group.title, student.fullName).chooseOption('Исключить из группы');
    await studentsPage.modal.excludeButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.modal.block.getLocator).toBeHidden();
  });

  test('#SBO-T6741 Удалить обучающегося', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupAccordionButton(group.title).click();
    await studentsPage.groupStudentAction(group.title, student.fullName).chooseOption('Удалить');
    await studentsPage.modal.removeButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.modal.block.getLocator).toBeHidden();
  });

  test('#SBO-T6692 Выбрать обучающегося из списка в форме просмотра группы', async ({
    studentsGroupPage,
    studentApiMock,
  }) => {
    await studentApiMock.mockSelectStudent(group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.selectFromListButton.click();
    await expect(studentsGroupPage.studentDrawer.textBlock(form.student.setting).getLocator).toBeVisible();
    await studentsGroupPage.chooseStudentSwitch(student.fullName).click();
    await studentsGroupPage.studentDrawer.saveButton.click();

    await expect(studentsGroupPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsGroupPage.studentDrawer.textBlock(form.student.setting).getLocator).toBeHidden();
  });

  test('#SBO-T6691 Добавить нового обучающегося в форме просмотра группы', async ({
    studentsGroupPage,
    studentApiMock,
    helper,
  }) => {
    await studentApiMock.mockAddStudent(StudentAnswer.SUCCESS, group, student);

    await studentsGroupPage.open();

    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();
    await studentsGroupPage.addNewButton.click();

    await expect(studentsGroupPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeVisible();
    await studentsGroupPage.studentDrawer.emailField.fill(student.email);
    await studentsGroupPage.studentDrawer.lastNameField.fill(student.lastName);
    await studentsGroupPage.studentDrawer.firstNameField.fill(student.firstName);
    await studentsGroupPage.studentDrawer.middleNameField.fill(student.middleName);
    await studentsGroupPage.studentDrawer.birthDateField.fill(
      helper.getDateInFormat(student.birthDate, DateFormat.yyyyMMdd),
    );
    await studentsGroupPage.studentDrawer.sexRadioButton(student.gender.name).click();
    await studentsGroupPage.studentDrawer.snilsField.fill(student.snilsNumber);
    await studentsGroupPage.studentDrawer.innField.fill(student.innNumber);
    await studentsGroupPage.studentDrawer.financialSourceSelect.chooseOption(student.financing.title);
    await studentsGroupPage.studentDrawer.personalField.fill(student.personalNumber);
    await studentsGroupPage.studentDrawer.bookNumberField.fill(student.bookNumber);
    await studentsGroupPage.studentDrawer.studyCourseSelect.chooseOption(student.course.name);
    await expect(studentsGroupPage.studentDrawer.studyGroupSelect.getLocator.locator('button')).toBeDisabled();
    await studentsGroupPage.studentDrawer.saveButton.click();

    await expect(studentsGroupPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsGroupPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeHidden();
  });

  test('#SBO-T6678 Отредактировать группу в форме просмотра группы', async ({ studentsGroupPage, studentApiMock }) => {
    const editGroup = new StudyGroupModel();
    await studentApiMock.mockSetGroup(StudentAnswer.SUCCESS, group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();
    await studentsGroupPage.editGroupButton.click();

    await expect(studentsGroupPage.groupDrawer.headerBlock(form.group.edit).getLocator).toBeVisible();
    await expect(studentsGroupPage.groupDrawer.showGroupTypeSelect.getLocator).toBeHidden();
    await studentsGroupPage.groupDrawer.titleField.fill(editGroup.title);
    await studentsGroupPage.groupDrawer.saveButton.click();

    await expect(studentsGroupPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsGroupPage.groupDrawer.headerBlock(form.group.edit).getLocator).toBeHidden();
  });

  test('#SBO-T6682 Удалить группу в форме просмотра', async ({ studentsPage, studentsGroupPage, studentApiMock }) => {
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.deleteGroupButton.click();
    await studentsGroupPage.modal.removeButton.click();
    await expect(studentsGroupPage.modal.block.getLocator).toBeHidden();

    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
  });

  test('#SBO-T6725 Удалить обучающегося в форме просмотра группы [https://jira.pcbltools.ru/jira/browse/SU-2376]', async ({
    studentsGroupPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.studentActionSelect(student.fullName).chooseOption('Удалить');
    await studentsGroupPage.modal.removeButton.click();
    await expect(studentsGroupPage.modal.block.getLocator).toBeHidden();

    await expect(studentsGroupPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
  });

  test('#SBO-T6694 Исключить обучающегося из группы в форме просмотра группы [https://jira.pcbltools.ru/jira/browse/SU-2376]', async ({
    studentsGroupPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.studentActionSelect(student.fullName).chooseOption('Исключить из группы');
    await studentsGroupPage.modal.excludeButton.click();

    await expect(studentsGroupPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
  });

  test('#SBO-T6695 Отредактировать обучающегося в форме просмотра группы [https://jira.pcbltools.ru/jira/browse/SU-2733]', async ({
    studentsGroupPage,
    studentApiMock,
    helper,
  }) => {
    test.fail();
    const newStudent = new StudentModel({});
    await studentApiMock.mockSetStudent(group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();
    await studentsGroupPage.studentActionSelect(student.fullName).chooseOption('Редактировать');
    await expect(studentsGroupPage.studentDrawer.headerBlock(form.student.edit).getLocator).toBeVisible();

    await expect(studentsGroupPage.studentDrawer.emailField.getLocator).toBeDisabled();
    await expect(studentsGroupPage.studentDrawer.studyGroupSelect.getLocator.locator('button')).toBeDisabled();
    await studentsGroupPage.studentDrawer.lastNameField.fill(newStudent.lastName);
    await studentsGroupPage.studentDrawer.firstNameField.fill(newStudent.firstName);
    await studentsGroupPage.studentDrawer.middleNameField.fill(newStudent.middleName);
    await studentsGroupPage.studentDrawer.birthDateField.fill(
      helper.getDateInFormat(newStudent.birthDate, DateFormat.yyyyMMdd),
    );
    await studentsGroupPage.studentDrawer.sexRadioButton(newStudent.gender.name).click();
    await studentsGroupPage.studentDrawer.hasNotSnilsNumberSwitch.click(true);
    await studentsGroupPage.studentDrawer.hasNotInnNumberSwitch.click(true);
    await studentsGroupPage.studentDrawer.financialSourceSelect.chooseOption(newStudent.financing.title);
    await studentsGroupPage.studentDrawer.personalField.fill(newStudent.personalNumber);
    await studentsGroupPage.studentDrawer.bookNumberField.fill(newStudent.bookNumber);
    await studentsGroupPage.studentDrawer.studyCourseSelect.chooseOption(newStudent.course.name);
    await studentsGroupPage.studentDrawer.saveButton.click();

    await expect(studentsGroupPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsGroupPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeHidden();
  });

  test('#SBO-T6681 Отображение формы просмотра группы при отсутствие обучающихся', async ({
    studentsGroupPage,
    studentApiMock,
  }) => {
    const message = {
      header: 'В учебную группу не включён ни один обучающийся',
      text: 'Вы можете добавить в систему нового обучающегося или выбрать из списка',
    };
    await studentApiMock.mockListStudent(StudentAnswer.WITHOUT_STUDENTS, group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await expect.soft(studentsGroupPage.uiKit.headerH4Block(message.header).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.uiKit.textLabel(message.text).getLocator).toBeVisible();
  });

  test('#SBO-T6742 Удалить группу с обучающимися [https://jira.pcbltools.ru/jira/browse/SU-2376]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupActionSelect(group.title).chooseOption('Удалить группу');
    await studentsPage.modal.removeButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.modal.block.getLocator).toBeHidden();
  });

  test('#SBO-T6724 Отображение формы при отсутствие обучающихся и учебных групп', async ({
    studentsPage,
    studentApiMock,
  }) => {
    const message = 'Для плана обучения не добавлены учебные группы и обучающиеся';
    await studentApiMock.mockListStudent(StudentAnswer.WITHOUT_GROUPS_AND_STUDENTS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await expect.soft(studentsPage.uiKit.headerH1Block(message).getLocator).toBeVisible();
    await expect.soft(studentsPage.actionSelect.getLocator).toBeVisible();
  });

  test('#SBO-T6753 Добавить обучающегося в пространстве без роли «Обучающийся» [https://jira.pcbltools.ru/jira/browse/SU-2041]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    const modal = {
      header: 'Ошибка',
      text: 'В образовательном пространстве отсутствует роль "Обучающийся". Добавление невозможно.',
    };
    await studentApiMock.mockListStudent(StudentAnswer.WITHOUT_STUDENT_ROLE, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.actionSelect.chooseOption('Добавить обучающегося');
    await expect(studentsPage.modal.headerBlock(modal.header).getLocator).toBeVisible();
    await expect(studentsPage.uiKit.textLabel(modal.text).getLocator).toBeVisible();

    await studentsPage.modal.okayButton.click();
    await expect(studentsPage.modal.block.getLocator).toBeHidden();
  });

  test('#SBO-T6667 Навигация в форме добавления группы [https://jira.pcbltools.ru/jira/browse/SU-2043]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockAddGroup(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    for (const component of [studentsPage.studentDrawer.cancelButton, studentsPage.studentDrawer.closeIconButton]) {
      await studentsPage.actionSelect.chooseOption('Добавить группу');
      await component.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.group.add).getLocator).toBeHidden();

      await studentsPage.actionSelect.chooseOption('Добавить группу');
      await studentsPage.uiKit.titleField.fill(group.title);
      await component.click();
      await studentsPage.modal.stayButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.closeButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.yesCloseButton.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.group.add).getLocator).toBeHidden();
    }
  });

  test('#SBO-T6677 Навигация в форме редактирования группы [https://jira.pcbltools.ru/jira/browse/SU-2043]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    const editGroup = new StudyGroupModel();
    await studentApiMock.mockSetGroup(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    for (const component of [studentsPage.studentDrawer.cancelButton, studentsPage.studentDrawer.closeIconButton]) {
      await studentsPage.groupActionSelect(group.title).chooseOption('Редактировать группу');
      await component.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.group.edit).getLocator).toBeHidden();

      await studentsPage.groupActionSelect(group.title).chooseOption('Редактировать группу');
      await studentsPage.uiKit.titleField.fill(editGroup.title);
      await component.click();
      await studentsPage.modal.stayButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.closeButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.yesCloseButton.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.group.edit).getLocator).toBeHidden();
    }
  });

  test('#SBO-T6699 Навигация в форме добавления обучающегося [https://jira.pcbltools.ru/jira/browse/SU-2043]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockAddStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    for (const component of [studentsPage.studentDrawer.cancelButton, studentsPage.studentDrawer.closeIconButton]) {
      await studentsPage.actionSelect.chooseOption('Добавить обучающегося');
      await component.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeHidden();

      await studentsPage.actionSelect.chooseOption('Добавить обучающегося');
      await studentsPage.studentDrawer.firstNameField.fill(student.firstName);
      await component.click();
      await studentsPage.modal.stayButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.closeButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.yesCloseButton.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeHidden();
    }
  });

  test('#SBO-T6721 Навигация в форме редактирования обучающегося [https://jira.pcbltools.ru/jira/browse/SU-2043]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockSetStudent(group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.groupAccordionButton(group.title).click();

    for (const component of [studentsPage.studentDrawer.cancelButton, studentsPage.studentDrawer.closeIconButton]) {
      await studentsPage.groupStudentAction(group.title, student.fullName).chooseOption('Редактировать');
      await component.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.student.edit).getLocator).toBeHidden();

      await studentsPage.groupStudentAction(group.title, student.fullName).chooseOption('Редактировать');
      await studentsPage.studentDrawer.firstNameField.fill(student.firstName);
      await component.click();
      await studentsPage.modal.stayButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.closeButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.yesCloseButton.click();
      await expect(studentsPage.studentDrawer.headerBlock(form.student.edit).getLocator).toBeHidden();
    }
  });

  test('#SBO-T6734 Навигация в форме выбора обучающихся [https://jira.pcbltools.ru/jira/browse/SU-2043]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockSelectStudent(group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    for (const component of [studentsPage.studentDrawer.cancel2Button, studentsPage.studentDrawer.closeIconButton]) {
      await studentsPage.groupActionSelect(group.title).chooseOption('Выбрать обучающегося из списка');
      await component.click();
      await expect(studentsPage.choseStudentsDrawer.headerBlock(form.student.setting).getLocator).toBeHidden();

      await studentsPage.groupActionSelect(group.title).chooseOption('Выбрать обучающегося из списка');
      await studentsPage.choseStudentsDrawer.chooseStudentSwitch(student.fullName).click();
      await component.click();
      await studentsPage.modal.stayButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.closeButton.click();
      await expect(studentsPage.modal.block.getLocator).toBeHidden();

      await component.click();
      await studentsPage.modal.yesCloseButton.click();
      await expect(studentsPage.choseStudentsDrawer.headerBlock(form.student.setting).getLocator).toBeHidden();
    }
  });

  test('#SBO-T6680 Навигация в форме просмотра группы', async ({ studentsPage, studentsGroupPage, studentApiMock }) => {
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.deleteGroupButton.click();
    await studentsGroupPage.modal.cancelButton.click();
    await expect(studentsGroupPage.modal.block.getLocator).toBeHidden();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.studentActionSelect(student.fullName).chooseOption('Исключить из группы');
    await studentsGroupPage.modal.cancelButton.click();
    await expect(studentsGroupPage.modal.block.getLocator).toBeHidden();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.studentActionSelect(student.fullName).chooseOption('Удалить');
    await studentsGroupPage.modal.cancelButton.click();
    await expect(studentsGroupPage.modal.block.getLocator).toBeHidden();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.backToStudentsButton.click();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
  });

  GROUP_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T6666 Валидация в форме добавления группы «${obj.name}»`, async ({ studentsPage, studentApiMock }) => {
      await studentApiMock.mockAddGroup(StudentAnswer.SUCCESS, group, student);

      await studentsPage.open();
      await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
      await studentsPage.actionSelect.chooseOption('Добавить группу');

      await expect(studentsPage.groupDrawer.headerBlock(form.group.add).getLocator).toBeVisible();
      await studentsPage.groupDrawer.titleField.fill(obj.title.value);
      obj.type?.value && (await studentsPage.groupDrawer.showGroupTypeSelect.chooseOption(obj.type.value));
      await studentsPage.groupDrawer.saveButton.click();

      obj.title?.message && (await expect(studentsPage.titleWrapper(obj.title.message).getLocator).toBeVisible());
      obj.type?.message && (await expect(studentsPage.typeWrapper(obj.type.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' &&
        (await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible());
    });
  });

  test('#SBO-T6666 Валидация в форме добавления группы «Уникальное значение - «Название» [https://jira.pcbltools.ru/jira/browse/SU-818]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    const message = 'Группа с таким названием уже добавлена в пространство';
    await studentApiMock.mockAddGroup(StudentAnswer.UNIQUE_GROUP_TITLE, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.actionSelect.chooseOption('Добавить группу');
    await expect(studentsPage.groupDrawer.headerBlock(form.group.add).getLocator).toBeVisible();
    await studentsPage.groupDrawer.showGroupTypeSelect.chooseOption(group.groupType.name);
    await studentsPage.groupDrawer.titleField.fill(group.title);
    await studentsPage.groupDrawer.saveButton.click();

    await expect(studentsPage.titleWrapper(message).getLocator).toBeVisible();
  });

  GROUP_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T6675 Валидация в форме редактирования группы «${obj.name}»`, async ({
      studentsPage,
      studentApiMock,
    }) => {
      // https://jira.pcbltools.ru/jira/browse/SU-2036
      await studentApiMock.mockSetGroup(StudentAnswer.SUCCESS, group, student);

      await studentsPage.open();
      await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

      await studentsPage.groupActionSelect(group.title).chooseOption('Редактировать группу');
      await expect(studentsPage.studentDrawer.headerBlock(form.group.edit).getLocator).toBeVisible();
      await studentsPage.uiKit.titleField.fill(obj.title.value);
      await studentsPage.studentDrawer.saveButton.click();

      obj.title?.message && (await expect(studentsPage.titleWrapper(obj.title.message).getLocator).toBeVisible());
      obj.name === 'Граничные значения' &&
        (await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible());
    });
  });

  test('#SBO-T6675 Валидация в форме редактирования группы «Уникальное значение - «Название» [https://jira.pcbltools.ru/jira/browse/SU-818]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    const editGroup = new StudyGroupModel();
    const message = 'Группа с таким названием уже добавлена в пространство';
    await studentApiMock.mockSetGroup(StudentAnswer.UNIQUE_GROUP_TITLE, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupActionSelect(group.title).chooseOption('Редактировать группу');
    await expect(studentsPage.groupDrawer.headerBlock(form.group.edit).getLocator).toBeVisible();
    await studentsPage.groupDrawer.titleField.fill(editGroup.title);
    await studentsPage.groupDrawer.saveButton.click();

    await expect(studentsPage.titleWrapper(message).getLocator).toBeVisible();
  });

  STUDENT_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T6698 Валидация в форме добавления обучающегося «${obj.name}»`, async ({
      studentsPage,
      studentApiMock,
    }) => {
      await studentApiMock.mockAddStudent(StudentAnswer.SUCCESS, group, student);

      await studentsPage.open();
      await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

      await studentsPage.actionSelect.chooseOption('Добавить обучающегося');
      await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeVisible();

      await studentsPage.studentDrawer.emailField.fill(obj.email.value);
      await studentsPage.studentDrawer.lastNameField.fill(obj.lastName.value);
      await studentsPage.studentDrawer.firstNameField.fill(obj.firstName.value);
      await studentsPage.studentDrawer.middleNameField.fill(obj.middleName.value);
      await studentsPage.studentDrawer.snilsField.fill(obj.SNILS.value);
      await studentsPage.studentDrawer.innField.fill(obj.INN.value);
      obj.financing?.value &&
        (await studentsPage.studentDrawer.financialSourceSelect.chooseOption(obj.financing.value));
      await studentsPage.studentDrawer.personalField.fill(obj.personalNumber.value);
      await studentsPage.studentDrawer.bookNumberField.fill(obj.bookNumber.value);
      await studentsPage.studentDrawer.saveButton.click();

      obj.email?.message && (await expect(studentsPage.emailWrapper(obj.email.message).getLocator).toBeVisible());
      obj.lastName?.message &&
        (await expect(studentsPage.lastNameWrapper(obj.lastName.message).getLocator).toBeVisible());
      obj.firstName?.message &&
        (await expect(studentsPage.firstNameWrapper(obj.firstName.message).getLocator).toBeVisible());
      obj.middleName?.message &&
        (await expect(studentsPage.middleNameWrapper(obj.middleName.message).getLocator).toBeVisible());
      obj.SNILS?.message && (await expect(studentsPage.snilsNumberWrapper(obj.SNILS.message).getLocator).toBeVisible());
      obj.INN?.message && (await expect(studentsPage.innNumberWrapper(obj.INN.message).getLocator).toBeVisible());
      obj.financing?.message &&
        (await expect(studentsPage.financingWrapper(obj.financing.message).getLocator).toBeVisible());
      obj.personalNumber?.message &&
        (await expect(studentsPage.personalNumberWrapper(obj.personalNumber.message).getLocator).toBeVisible());
      obj.bookNumber?.message &&
        (await expect(studentsPage.bookNumberWrapper(obj.bookNumber.message).getLocator).toBeVisible());
      obj.name === ('Граничные значения' || 'Только обязательные') &&
        (await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible());
    });
  });

  test('#SBO-T6698 Валидация в форме добавления обучающегося «Уникальное значение - «Почта» [https://jira.pcbltools.ru/jira/browse/SU-1387]', async ({
    studentsPage,
    studentApiMock,
    helper,
  }) => {
    test.fail();
    const message = 'Обучающийся с такой почтой уже добавлен в план обучения';
    await studentApiMock.mockAddStudent(StudentAnswer.UNIQUE_STUDENT_EMAIL, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.actionSelect.chooseOption('Добавить обучающегося');
    await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeVisible();
    await studentsPage.studentDrawer.emailField.fill(student.email);
    await studentsPage.studentDrawer.lastNameField.fill(student.lastName);
    await studentsPage.studentDrawer.firstNameField.fill(student.firstName);
    await studentsPage.studentDrawer.middleNameField.fill(student.middleName);
    await studentsPage.studentDrawer.birthDateField.fill(
      helper.getDateInFormat(student.birthDate, DateFormat.yyyyMMdd),
    );
    await studentsPage.studentDrawer.sexRadioButton(student.gender.name).click();
    await studentsPage.studentDrawer.snilsField.fill(student.snilsNumber);
    await studentsPage.studentDrawer.innField.fill(student.innNumber);
    await studentsPage.studentDrawer.financialSourceSelect.chooseOption(student.financing.title);
    await studentsPage.studentDrawer.personalField.fill(student.personalNumber);
    await studentsPage.studentDrawer.bookNumberField.fill(student.bookNumber);
    await studentsPage.studentDrawer.studyCourseSelect.chooseOption(student.course.name);
    await studentsPage.studentDrawer.studyGroupSelect.chooseOption(group.title);
    await studentsPage.studentDrawer.saveButton.click();

    await expect(studentsPage.emailWrapper(message).getLocator).toBeVisible();
  });

  STUDENT_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T6722 Валидация в форме редактирования обучающегося «${obj.name}»`, async ({
      studentsPage,
      studentApiMock,
    }) => {
      await studentApiMock.mockSetStudent(group, student);

      await studentsPage.open();
      await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

      await studentsPage.groupAccordionButton(group.title).click();
      await studentsPage.groupStudentAction(group.title, student.fullName).chooseOption('Редактировать');
      await expect(studentsPage.studentDrawer.headerBlock(form.student.edit).getLocator).toBeVisible();

      await studentsPage.studentDrawer.lastNameField.fill(obj.lastName.value);
      await studentsPage.studentDrawer.firstNameField.fill(obj.firstName.value);
      await studentsPage.studentDrawer.middleNameField.fill(obj.middleName.value);
      await studentsPage.studentDrawer.snilsField.manualFill(obj.SNILS.value);
      await studentsPage.studentDrawer.innField.fill(obj.INN.value);
      await studentsPage.studentDrawer.personalField.fill(obj.personalNumber.value);
      await studentsPage.studentDrawer.bookNumberField.fill(obj.bookNumber.value);
      await studentsPage.studentDrawer.saveButton.click();

      obj.lastName?.message &&
        (await expect(studentsPage.lastNameWrapper(obj.lastName.message).getLocator).toBeVisible());
      obj.firstName?.message &&
        (await expect(studentsPage.firstNameWrapper(obj.firstName.message).getLocator).toBeVisible());
      obj.middleName?.message &&
        (await expect(studentsPage.middleNameWrapper(obj.middleName.message).getLocator).toBeVisible());
      obj.SNILS?.message && (await expect(studentsPage.snilsNumberWrapper(obj.SNILS.message).getLocator).toBeVisible());
      obj.INN?.message && (await expect(studentsPage.innNumberWrapper(obj.INN.message).getLocator).toBeVisible());
      obj.personalNumber?.message &&
        (await expect(studentsPage.personalNumberWrapper(obj.personalNumber.message).getLocator).toBeVisible());
      obj.bookNumber?.message &&
        (await expect(studentsPage.bookNumberWrapper(obj.bookNumber.message).getLocator).toBeVisible());
      obj.name === ('Граничные значения' || 'Только обязательные') &&
        (await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible());
    });
  });

  test('#SBO-T6733 Выбрать всех обучающихся из списка в группе [https://jira.pcbltools.ru/jira/browse/SU-2039]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    const message = 'Нет обучающихся для добавления в группу';
    await studentApiMock.mockListStudent(StudentAnswer.ALL_STUDENTS_IN_GROUP, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.groupActionSelect(group.title).hoverOption('Выбрать обучающегося из списка');
    await expect(studentsPage.uiKit.textLabel(message).getLocator).toBeVisible();
  });

  test('#SBO-T6693 Выбрать всех обучающихся из списка в форме просмотра группы [https://jira.pcbltools.ru/jira/browse/SU-2039]', async ({
    studentsGroupPage,
    studentApiMock,
  }) => {
    test.fail();
    const message = 'Нет обучающихся для добавления в группу';
    await studentApiMock.mockListStudent(StudentAnswer.ALL_STUDENTS_IN_GROUP, group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();

    await studentsGroupPage.selectFromListButton.hover();
    await expect(studentsGroupPage.uiKit.textLabel(message).getLocator).toBeVisible();
  });

  test('#SBO-T6664 Отображение формы добавления группы', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockAddGroup(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.actionSelect.chooseOption('Добавить группу');

    await expect(studentsPage.groupDrawer.headerBlock(form.group.add).getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.closeIconButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.showGroupTypeSelect.getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.titleField.getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.cancelButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.saveButton.getLocator).toBeVisible();
  });

  test('#SBO-T6676 Отображение формы редактирования группы', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockSetGroup(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.groupActionSelect(group.title).chooseOption('Редактировать группу');

    await expect(studentsPage.groupDrawer.headerBlock(form.group.edit).getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.closeIconButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.showGroupTypeSelect.getLocator).toBeHidden();
    await expect.soft(studentsPage.groupDrawer.titleField.getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.cancelButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.groupDrawer.saveButton.getLocator).toBeVisible();
  });

  test('#SBO-T6696 Отображение формы добавления обучающегося', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockAddStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.actionSelect.chooseOption('Добавить обучающегося');

    await expect(studentsPage.studentDrawer.headerBlock(form.student.add).getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.closeIconButton.getLocator).toBeVisible();

    await expect.soft(studentsPage.uiKit.headerH3Block('Персональные данные').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.emailField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.lastNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.firstNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.middleNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.birthDateField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.sexRadioButton('Женский').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.sexRadioButton('Мужской').getLocator).toBeVisible();

    await expect.soft(studentsPage.uiKit.headerH3Block('Дополнительные документы').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.hasNotSnilsNumberSwitch.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.snilsField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.hasNotInnNumberSwitch.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.innField.getLocator).toBeVisible();

    await expect.soft(studentsPage.uiKit.headerH3Block('Данные обучающегося').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.financialSourceSelect.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.personalField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.bookNumberField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.studyCourseSelect.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.studyGroupSelect.getLocator).toBeVisible();

    const message = 'Обучающийся получит письмо с уведомлением на указанную эл.почту';
    await expect.soft(studentsPage.uiKit.textLabel(message).getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.cancelButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.saveButton.getLocator).toBeVisible();
  });

  test('#SBO-T6714 Отображение формы редактирования обучающегося', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockSetStudent(group, student);

    await studentsPage.open();
    await studentsPage.groupAccordionButton(group.title).click();
    await studentsPage.groupStudentAction(group.title, student.fullName).chooseOption('Редактировать');

    await expect(studentsPage.studentDrawer.headerBlock(form.student.edit).getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.closeIconButton.getLocator).toBeVisible();

    await expect.soft(studentsPage.uiKit.headerH3Block('Персональные данные').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.emailField.getLocator).toBeDisabled();
    await expect.soft(studentsPage.studentDrawer.lastNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.firstNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.middleNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.birthDateField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.sexRadioButton('Женский').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.sexRadioButton('Мужской').getLocator).toBeVisible();

    await expect.soft(studentsPage.uiKit.headerH3Block('Дополнительные документы').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.hasNotSnilsNumberSwitch.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.snilsField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.hasNotInnNumberSwitch.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.innField.getLocator).toBeVisible();

    await expect.soft(studentsPage.uiKit.headerH3Block('Данные обучающегося').getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.financialSourceSelect.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.personalField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.bookNumberField.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.studyCourseSelect.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.studyGroupSelect.getLocator).toBeVisible();

    const message = 'Обучающийся получит письмо с уведомлением на указанную эл.почту';
    await expect.soft(studentsPage.uiKit.textLabel(message).getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.cancelButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.saveButton.getLocator).toBeVisible();
  });

  test('#SBO-T6735 Отображение формы выбора из списка [https://jira.pcbltools.ru/jira/browse/SU-2482]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockSelectStudent(group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.groupActionSelect(group.title).chooseOption('Выбрать обучающегося из списка');

    await expect(studentsPage.studentDrawer.textBlock(form.student.setting).getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.closeIconButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.choseStudentsDrawer.searchByFullNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.choseStudentsDrawer.chooseStudentSwitch(student.fullName).getLocator).toBeVisible();
    await expect
      .soft(studentsPage.choseStudentsDrawer.studentInfoBlock(student.fullName, student.course.name).getLocator)
      .toBeVisible();
    await expect
      .soft(studentsPage.choseStudentsDrawer.studentInfoBlock(student.fullName, student.email).getLocator)
      .toBeVisible();
    await expect
      .soft(
        studentsPage.choseStudentsDrawer.studentInfoBlock(student.fullName, student.financing.shortTitle).getLocator,
      )
      .toBeVisible();
    await expect
      .soft(studentsPage.choseStudentsDrawer.studentInfoBlock(student.fullName, student.bookNumber).getLocator)
      .toBeVisible();
    await expect.soft(studentsPage.studentDrawer.cancelButton.getLocator).toBeVisible();
    await expect.soft(studentsPage.studentDrawer.saveButton.getLocator).toBeVisible();
  });

  test('#SBO-T6684 Отображение формы просмотра группы [https://jira.pcbltools.ru/jira/browse/SU-2047]', async ({
    studentsGroupPage,
    studentApiMock,
    helper,
  }) => {
    test.fail();
    const program = new ProgramModel();
    const plan = new PlanModel();
    const formatDate = helper.getDateInFormat(plan.eduStartDate, DateFormat.ddMMyyyy);
    await studentApiMock.mockViewStudentGroup(group, student, program, plan);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH2Block('Учебная группа').getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.backToStudentsButton.getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.deleteGroupButton.getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.editGroupButton.getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.programBlock(program.title).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.planBlock(plan.title).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.groupTypeBlock(group.groupType.name).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.eduFormBlock(plan.eduForm.title).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.competitionPeriodBlock(plan.competitionPeriod.name).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.yearBlock(plan.enrollmentYear.toString()).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.startDateBlock(formatDate).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.studyCountBlock(55).getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.addNewButton.getLocator).toBeVisible();
    await expect.soft(studentsGroupPage.selectFromListButton.getLocator).toBeVisible();
    await expect
      .soft(studentsGroupPage.studentInfoBlock(student.fullName, student.course.name).getLocator)
      .toBeVisible();
    await expect.soft(studentsGroupPage.studentInfoBlock(student.fullName, student.email).getLocator).toBeVisible();
    await expect
      .soft(studentsGroupPage.studentInfoBlock(student.fullName, student.financing.shortTitle).getLocator)
      .toBeVisible();
    await expect
      .soft(studentsGroupPage.studentInfoBlock(student.fullName, student.bookNumber).getLocator)
      .toBeVisible();
  });

  test('#SBO-T6736 Фильтрация по группе и ФИО обучающегося [https://jira.pcbltools.ru/jira/browse/SU-2482]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.filterByGroupSelect.chooseOption(group.title);
    await expect(studentsPage.groupAccordionButton(group.title).getLocator).toBeVisible();
    await expect(studentsPage.groupAccordionButton(withoutGroupTitle).getLocator).toBeHidden();
    expect(await studentsPage.countGroupBlock.getCount()).toEqual(1);

    await studentsPage.filterByGroupSelect.chooseOption(withoutGroupTitle);
    await expect(studentsPage.groupAccordionButton(withoutGroupTitle).getLocator).toBeVisible();
    await expect(studentsPage.groupAccordionButton(group.title).getLocator).toBeHidden();
    expect(await studentsPage.countGroupBlock.getCount()).toEqual(1);

    await studentsPage.filterByGroupSelect.chooseOption('Все группы');
    await expect(studentsPage.groupAccordionButton(group.title).getLocator).toBeVisible();
    await expect(studentsPage.groupAccordionButton(withoutGroupTitle).getLocator).toBeVisible();
    expect(await studentsPage.countGroupBlock.getCount()).toEqual(4);

    await studentsPage.searchByFullNameField.fill(student.firstName);
    await studentsPage.groupAccordionButton(group.title).click();
    await expect(studentsPage.studentCardBlock(student.firstName).getLocator).toBeVisible();

    const stub = { header: 'Такие обучающиеся не найдены', message: 'Измените параметры поиска и повторите попытку' };
    await studentsPage.searchByFullNameField.fill(group.title);
    await expect(studentsPage.uiKit.textLabel(stub.header).getLocator).toBeVisible();
    await expect(studentsPage.uiKit.textLabel(stub.message).getLocator).toBeVisible();
  });

  test('#SBO-T6726 Фильтрация в форме выбора обучающихся [https://jira.pcbltools.ru/jira/browse/SU-2482]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    await studentApiMock.mockSelectStudent(group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupActionSelect(group.title).chooseOption('Выбрать обучающегося из списка');
    await expect(studentsPage.studentDrawer.textBlock(form.student.setting).getLocator).toBeVisible();

    await studentsPage.searchByFullNameField.fill(student.firstName);
    await studentsPage.groupAccordionButton(group.title).click();
    await expect(studentsPage.studentCardBlock(student.firstName).getLocator).toBeVisible();

    const stub = { header: 'Такие обучающиеся не найдены', message: 'Измените параметры поиска и повторите попытку' };
    await studentsPage.searchByFullNameField.fill(group.title);
    await expect(studentsPage.uiKit.textLabel(stub.header).getLocator).toBeVisible();
    await expect(studentsPage.uiKit.textLabel(stub.message).getLocator).toBeVisible();
  });

  test('#SBO-T6663 Отображение формы [https://jira.pcbltools.ru/jira/browse/SU-2482]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    // https://jira.pcbltools.ru/jira/browse/SU-2046
    // https://jira.pcbltools.ru/jira/browse/SU-2047
    test.fail();
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await expect.soft(studentsPage.filterByGroupSelect.getLocator).toBeVisible();
    await expect.soft(studentsPage.searchByFullNameField.getLocator).toBeVisible();
    await expect.soft(studentsPage.actionSelect.getLocator).toBeVisible();
    await expect(studentsPage.groupAccordionButton(withoutGroupTitle).getLocator).toBeVisible();

    await studentsPage.groupAccordionButton(group.title).click();
    await expect.soft(studentsPage.groupCountBlock(group.title, 4).getLocator).toBeVisible();
    await expect.soft(studentsPage.studentInfoBlock(student.fullName, student.email).getLocator).toBeVisible();

    await expect.soft(studentsPage.studentInfoBlock(student.fullName, student.course.name).getLocator).toBeVisible();
    await expect
      .soft(studentsPage.studentInfoBlock(student.fullName, student.financing.shortTitle).getLocator)
      .toBeVisible();
    await expect.soft(studentsPage.studentInfoBlock(student.fullName, student.bookNumber).getLocator).toBeVisible();
    await expect.soft(studentsPage.groupStudentAction(group.title, student.fullName).getLocator).toBeVisible();

    const groupWithoutStudents = 'Группа 9456';
    await expect.soft(studentsPage.groupAccordionButton(groupWithoutStudents).getLocator).toBeDisabled();
    await expect.soft(studentsPage.groupStubBlock(groupWithoutStudents).getLocator).toBeVisible();
    await expect.soft(studentsPage.groupCountBlock(groupWithoutStudents, 0).getLocator).toBeVisible();
  });

  test('#SBO-T6683 Пагинация обучающихся в форме просмотра группы', async ({ studentsGroupPage, studentApiMock }) => {
    await studentApiMock.mockViewStudentGroup(group, student);

    await studentsGroupPage.open();
    await expect(studentsGroupPage.uiKit.headerH1Block(group.title).getLocator).toBeVisible();
    await studentsGroupPage.studentCardBlock('scroll-case@mail.ru').scrollToElementIfNeeded();
    expect(await studentsGroupPage.page.waitForResponse('**/graphql'));
  });

  test('#SBO-T7926 Пагинация обучающихся', async ({ studentsPage, studentApiMock }) => {
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();
    await studentsPage.groupAccordionButton(withoutGroupTitle).click();
    await studentsPage.studentCardBlock('scroll-case@mail.ru').scrollToElementIfNeeded();
    expect(await studentsPage.page.waitForResponse('**/graphql'));
  });

  test('#SBO-T6739 Удалить группу[https://jira.pcbltools.ru/jira/browse/SU-2376]', async ({
    studentsPage,
    studentApiMock,
  }) => {
    test.fail();
    const groupWithoutStudents = 'Группа 9456';
    await studentApiMock.mockListStudent(StudentAnswer.SUCCESS, group, student);

    await studentsPage.open();
    await expect(studentsPage.uiKit.headerH2Block(form.list).getLocator).toBeVisible();

    await studentsPage.groupActionSelect(groupWithoutStudents).chooseOption('Удалить группу');
    await studentsPage.modal.removeButton.click();

    await expect(studentsPage.uiKit.toastBlock(form.toast).getLocator).toBeVisible();
    await expect(studentsPage.modal.block.getLocator).toBeHidden();
  });
});
