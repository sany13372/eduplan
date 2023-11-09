import { Page } from '@playwright/test';

import { GraphqlMockHelper } from '../graphql-mock.helper';
import { DescAnswer } from '../data/enum/desc.answer.enum';
import { DescModel } from '../data/model/desc.model';
import { DescResponse } from '../data/response/desc.response';
import { EduPlanResponse } from '../data/response/eduplan.response';

export class DescApiMock {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockSettingDesc(answer: DescAnswer, model: DescModel): Promise<void> {
    const operations = [
      { name: 'readEduPlan', response: () => EduPlanResponse.readEduPlan() },
      { name: 'getEduPlanCard', response: () => DescResponse.getEduPlanCard(answer, model) },
      { name: 'setEduPlanCard', response: () => DescResponse.setEduPlanCard() },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }
}
