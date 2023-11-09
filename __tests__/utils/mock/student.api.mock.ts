import { Page } from '@playwright/test';

import { GraphqlMockHelper } from '../graphql-mock.helper';
import { EduPlanResponse } from '../data/response/eduplan.response';
import { StudentResponse } from '../data/response/student.response';
import { SpaceResponse } from '../data/response/space.response';
import { DirectoryResponse } from '../data/response/directory.response';
import { StudyGroupModel } from '../data/model/study-group.model';
import { StudentModel } from '../data/model/student.model';
import { StudentAnswer } from '../data/enum/student.answer.enum';
import { ProgramModel } from '../data/model/program.model';
import { PlanModel } from '../data/model/plan.model';

interface Operation {
  name: string;
  response: () => unknown;
}

export class StudentApiMock {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockAddGroup(answer: StudentAnswer, group: StudyGroupModel, student: StudentModel): Promise<void> {
    const operations = [
      ...StudentApiMock.generateCommonOperations(),
      {
        name: 'readStudentGroups',
        response: () => StudentResponse.readStudentGroups(StudentAnswer.SUCCESS, group),
      },
      { name: 'readStudents', response: () => StudentResponse.readStudents(StudentAnswer.SUCCESS, student) },
      { name: 'readStudentGroupTypeSettings', response: () => StudentResponse.readStudentGroupTypeSettings() },
      { name: 'getSpaceTenants', response: () => SpaceResponse.getSpaceTenants() },
      { name: 'addStudentGroupV', response: () => StudentResponse.addStudentGroupV2(answer) },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockSetGroup(answer: StudentAnswer, group: StudyGroupModel, student: StudentModel): Promise<void> {
    const operations = [
      ...StudentApiMock.generateCommonOperations(),
      {
        name: 'readStudentGroups',
        response: () => StudentResponse.readStudentGroups(StudentAnswer.SUCCESS, group),
      },
      { name: 'readStudents', response: () => StudentResponse.readStudents(StudentAnswer.SUCCESS, student) },
      { name: 'readStudentGroupTypeSettings', response: () => StudentResponse.readStudentGroupTypeSettings() },
      { name: 'getSpaceTenants', response: () => SpaceResponse.getSpaceTenants() },
      { name: 'updateStudentGroup', response: () => StudentResponse.updateStudentGroup(answer) },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockAddStudent(answer: StudentAnswer, group: StudyGroupModel, student: StudentModel): Promise<void> {
    const operations = [
      ...StudentApiMock.generateCommonOperations(),
      {
        name: 'readStudentGroups',
        response: () => StudentResponse.readStudentGroups(StudentAnswer.SUCCESS, group),
      },
      { name: 'readStudents', response: () => StudentResponse.readStudents(StudentAnswer.SUCCESS, student) },
      { name: 'getSpaceTenants', response: () => SpaceResponse.getSpaceTenants() },
      { name: 'readSexSettings', response: () => DirectoryResponse.readSexSettings() },
      { name: 'readCourseSettings', response: () => DirectoryResponse.readCourseSettings() },
      {
        name: 'readEduFinancingSourceSettings',
        response: () => DirectoryResponse.readEduFinancingSourceSettings(),
      },
      { name: 'addStudent', response: () => StudentResponse.addStudent(answer) },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockSetStudent(group: StudyGroupModel, student: StudentModel): Promise<void> {
    const operations = [
      ...StudentApiMock.generateCommonOperations(),
      {
        name: 'readStudentGroups',
        response: () => StudentResponse.readStudentGroups(StudentAnswer.SUCCESS, group),
      },
      { name: 'readStudents', response: () => StudentResponse.readStudents(StudentAnswer.SUCCESS, student) },
      { name: 'getSpaceTenants', response: () => SpaceResponse.getSpaceTenants() },
      { name: 'readSexSettings', response: () => DirectoryResponse.readSexSettings() },
      { name: 'readCourseSettings', response: () => DirectoryResponse.readCourseSettings() },
      {
        name: 'readEduFinancingSourceSettings',
        response: () => DirectoryResponse.readEduFinancingSourceSettings(),
      },
      { name: 'getStudent', response: () => StudentResponse.getStudent(student) },
      { name: 'setStudent', response: () => StudentResponse.setStudent() },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockSelectStudent(group: StudyGroupModel, student: StudentModel): Promise<void> {
    const operations = [
      ...StudentApiMock.generateCommonOperations(),
      {
        name: 'readStudentGroups',
        response: () => StudentResponse.readStudentGroups(StudentAnswer.SUCCESS, group),
      },
      { name: 'readStudents', response: () => StudentResponse.readStudents(StudentAnswer.SUCCESS, student) },
      { name: 'getSpaceTenants', response: () => SpaceResponse.getSpaceTenants() },
      { name: 'addStudentsToGroup', response: () => StudentResponse.addStudentsToGroup() },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockListStudent(answer: StudentAnswer, group: StudyGroupModel, student: StudentModel): Promise<void> {
    const operations = [
      ...StudentApiMock.generateCommonOperations(),
      { name: 'readStudentGroups', response: () => StudentResponse.readStudentGroups(answer, group) },
      { name: 'readStudents', response: () => StudentResponse.readStudents(answer, student) },
      { name: 'getSpaceTenants', response: () => SpaceResponse.getSpaceTenants(answer) },
      { name: 'removeStudentsFromGroup', response: () => StudentResponse.removeStudentsFromGroup() },
      { name: 'removeStudent', response: () => StudentResponse.removeStudent() },
      { name: 'removeStudentGroupV', response: () => StudentResponse.removeStudentGroupV() },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockViewStudentGroup(
    group: StudyGroupModel,
    student: StudentModel,
    program = new ProgramModel(),
    plan = new PlanModel(),
  ): Promise<void> {
    const operations = [
      ...StudentApiMock.generateCommonOperations(),
      {
        name: 'readStudentGroups',
        response: () => StudentResponse.readStudentGroups(StudentAnswer.SUCCESS, group, program, plan),
      },
      {
        name: 'readStudents',
        response: () => StudentResponse.readStudents(StudentAnswer.SUCCESS, student),
      },
      {
        name: 'getSpaceTenants',
        response: () => SpaceResponse.getSpaceTenants(StudentAnswer.SUCCESS),
      },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  private static generateCommonOperations(): Operation[] {
    return [
      { name: 'readEduPlan', response: () => EduPlanResponse.readEduPlan() },
      { name: 'readEduPlans', response: () => EduPlanResponse.readEduPlans() },
    ];
  }
}
