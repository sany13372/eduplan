import { Page } from '@playwright/test';

import { GraphqlMockHelper } from '../graphql-mock.helper';
import { EduPlanResponse } from '../data/response/eduplan.response';
import { LessonAnswer } from '../data/enum/lesson.answer.enum';
import { LessonModel } from '../data/model/lesson.model';
import { LessonResponse } from '../data/response/lesson.response';
import { ThemeModel } from '../data/model/theme.model';

interface Operation {
  name: string;
  response: () => unknown;
}

export class LessonApiMock {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockAddingLesson(lessonModel: LessonModel, themeModel: ThemeModel): Promise<void> {
    const operations = [
      ...LessonApiMock.generateCommonOperations(),
      { name: 'addEduLesson', response: () => LessonResponse.addEduLesson() },
      {
        name: 'getEduPlanRowThemeWithLessonsList',
        response: () => LessonResponse.getEduPlanRowThemeWithLessonsList(LessonAnswer.SUCCESS, lessonModel, themeModel),
      },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockEditingLesson(lessonModel: LessonModel, themeModel: ThemeModel): Promise<void> {
    const operations = [
      ...LessonApiMock.generateCommonOperations(),
      { name: 'editEduLesson', response: () => LessonResponse.editEduLesson(LessonAnswer.SUCCESS) },
      { name: 'readEduLessons', response: () => LessonResponse.readEduLessons(lessonModel) },
      {
        name: 'getEduPlanRowThemeWithLessonsList',
        response: () => LessonResponse.getEduPlanRowThemeWithLessonsList(LessonAnswer.SUCCESS, lessonModel, themeModel),
      },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockListLesson(answer: LessonAnswer, lessonModel: LessonModel, themeModel: ThemeModel): Promise<void> {
    const operations = [
      ...LessonApiMock.generateCommonOperations(),
      {
        name: 'getEduPlanRowThemeWithLessonsList',
        response: () => LessonResponse.getEduPlanRowThemeWithLessonsList(answer, lessonModel, themeModel),
      },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockSettingsLesson(answer: LessonAnswer, lessonModel: LessonModel, themeModel: ThemeModel): Promise<void> {
    const operations = [
      ...LessonApiMock.generateCommonOperations(),
      { name: 'removeEduLesson', response: () => LessonResponse.removeEduLesson(answer) },
      { name: 'editEduLesson', response: () => LessonResponse.editEduLesson(answer) },
      {
        name: 'getEduPlanRowThemeWithLessonsList',
        response: () => LessonResponse.getEduPlanRowThemeWithLessonsList(LessonAnswer.SUCCESS, lessonModel, themeModel),
      },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  private static generateCommonOperations(): Operation[] {
    return [
      { name: 'readEduPlan', response: () => EduPlanResponse.readEduPlan() },
      { name: 'readEduPlanRow', response: () => EduPlanResponse.readEduPlanRow() },
      { name: 'readEduPlanRows', response: () => EduPlanResponse.readEduPlanRows() },
      { name: 'readEduPlanActivityRows', response: () => EduPlanResponse.readEduPlanActivityRows() },
      { name: 'readThemeLessonKindSettings', response: () => LessonResponse.readThemeLessonKindSettings() },
    ];
  }
}
