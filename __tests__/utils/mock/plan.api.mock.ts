import { Page } from '@playwright/test';

import { GraphqlMockHelper } from '../graphql-mock.helper';
import { EduPlanResponse } from '../data/response/eduplan.response';
import { PeriodAnswer } from '../data/enum/period.answer.enum';
import { PeriodModel } from '../data/model/period.model';

interface Operation {
  name: string;
  response: () => unknown;
}

export class PlanApiMock {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockPeriodPlan(answer: PeriodAnswer, model = new PeriodModel()): Promise<void> {
    const operations = [
      ...PlanApiMock.generateCommonOperations(),
      {
        name: 'getEduPlanGridElementPeriods',
        response: () => EduPlanResponse.getEduPlanGridElementPeriods(answer, model),
      },
      { name: 'getAllEduPlanPeriodKinds', response: () => EduPlanResponse.getAllEduPlanPeriodKinds() },
      { name: 'addEduPlanGridElementPeriod', response: () => EduPlanResponse.addEduPlanGridElementPeriod(answer) },
      { name: 'editEduPlanGridElementPeriod', response: () => EduPlanResponse.editEduPlanGridElementPeriod(answer) },
      { name: 'removeEduPlanGridElementPeriod', response: () => EduPlanResponse.removeEduPlanGridElementPeriod() },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  private static generateCommonOperations(): Operation[] {
    return [
      { name: 'readEduPlan', response: () => EduPlanResponse.readEduPlan() },
      { name: 'readEduPlans', response: () => EduPlanResponse.readEduPlans() },
      { name: 'getEduProgramAdmins', response: () => EduPlanResponse.getEduProgramAdmins() },
      { name: 'getAvailableEduProgramAdmins', response: () => EduPlanResponse.getAvailableEduProgramAdmins() },
      { name: 'readEduGridElementItems', response: () => EduPlanResponse.readEduGridElementItems() },
      { name: 'readEduProgram', response: () => EduPlanResponse.readEduProgram() },
      { name: 'readEduPlanRows', response: () => EduPlanResponse.readEduPlanRows() },
    ];
  }
}
