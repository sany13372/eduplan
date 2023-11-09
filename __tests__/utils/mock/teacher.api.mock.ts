import { Page } from '@playwright/test';

import { GraphqlMockHelper } from '../graphql-mock.helper';
import { EmployeeModel } from '../data/model/employee.model';
import { EduPlanResponse } from '../data/response/eduplan.response';
import { TeacherAnswer } from '../data/enum/teacher.answer.enum';
import { ActivityModel } from '../data/model/activity.model';
import { TeacherResponse } from '../data/response/teacher.response';

export class TeacherApiMock {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockTeachersTab(answer: TeacherAnswer, employee: EmployeeModel, activity: ActivityModel): Promise<void> {
    const operations = [
      { name: 'readEduPlan', response: () => EduPlanResponse.readEduPlan() },
      {
        name: 'getEduPlanEmployeeActivities',
        response: () => TeacherResponse.getEduPlanEmployeeActivities(answer, activity, employee),
      },
      { name: 'getEmployeesPaging', response: () => TeacherResponse.getEmployeesPaging(answer) },
      {
        name: 'getActivityEmployeesForInvitation',
        response: () => TeacherResponse.getActivityEmployeesForInvitation(employee),
      },
      { name: 'addActivityEmployees', response: () => TeacherResponse.addActivityEmployees() },
      { name: 'removeActivityEmployee', response: () => TeacherResponse.removeActivityEmployee() },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }
}
