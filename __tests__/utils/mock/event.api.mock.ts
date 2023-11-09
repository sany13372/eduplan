import { Page } from '@playwright/test';

import { EventModel } from '../data/model/event.model';
import { GraphqlMockHelper } from '../graphql-mock.helper';
import { StudentModel } from '../data/model/student.model';
import { EventAnswer } from '../data/enum/event.answer.enum';
import { EventResponse } from '../data/response/event.response';
import { EduPlanResponse } from '../data/response/eduplan.response';

export class EventApiMock {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockSettingEvents(answer: EventAnswer, event: EventModel, student: StudentModel): Promise<void> {
    const operations = [
      { name: 'readEduPlan', response: () => EduPlanResponse.readEduPlan() },
      { name: 'getEduPlanWebinars', response: () => EventResponse.getEduPlanWebinars(EventAnswer.SUCCESS, event) },
      { name: 'getEduPlanEventKinds', response: () => EventResponse.getEduPlanEventKinds(event) },
      { name: 'getEduPlanEventFormats', response: () => EventResponse.getEduPlanEventFormats() },
      { name: 'readVideoConfKinds', response: () => EventResponse.readVideoConfKinds(event) },
      { name: 'setEduPlanWebinar', response: () => EventResponse.setEduPlanWebinar() },
      {
        name: 'getEduPlanParticipantsToInvite',
        response: () => EventResponse.getEduPlanParticipantsToInvite(student),
      },
      { name: 'readCourses', response: () => EventResponse.readCourses(student) },
      { name: 'setEduPlanParticipants', response: () => EventResponse.setEduPlanParticipants() },
      { name: 'getEduPlanParticipants', response: () => EventResponse.getEduPlanParticipants(answer, student) },
      { name: 'getEduPlanWebinarRecordLink', response: () => EventResponse.getEduPlanWebinarRecordLink() },
      {
        name: 'getEduPlanParticipantPersonalLinks',
        response: () => EventResponse.getEduPlanParticipantPersonalLinks(),
      },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }

  async mockListEvents(answer: EventAnswer, event: EventModel): Promise<void> {
    const operations = [
      { name: 'readEduPlan', response: () => EduPlanResponse.readEduPlan() },
      { name: 'getEduPlanWebinars', response: () => EventResponse.getEduPlanWebinars(answer, event) },
      { name: 'publishEduPlanWebinar', response: () => EventResponse.publishEduPlanWebinar() },
      { name: 'removeEduPlanWebinar', response: () => EventResponse.removeEduPlanWebinar() },
    ];

    await GraphqlMockHelper.mockOperations(this.page, operations);
  }
}
