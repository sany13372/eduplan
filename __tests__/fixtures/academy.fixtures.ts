import { test as base } from '@playwright/test';

import { AcademyInit } from '../page-objects/academy.init';
import { EventApiMock } from '../utils/mock/event.api.mock';
import { EduPlanEventsPage } from '../page-objects/eduplan-events.page';
import { CommonHelper } from '../utils/common.helper';
import { EduPlanDescPage } from '../page-objects/eduplan-desc.page';
import { DescApiMock } from '../utils/mock/desc.api.mock';
import { DataGenerator } from '../utils/data/generator.data';
import { EduPlanTeachersPage } from '../page-objects/eduplan-teachers.page';
import { TeacherApiMock } from '../utils/mock/teacher.api.mock';
import { ActivityLessonPage } from '../page-objects/activity-lesson.page';
import { LessonApiMock } from '../utils/mock/lesson.api.mock';
import { EduPlanStudentsPage } from '../page-objects/eduplan-students.page';
import { StudentApiMock } from '../utils/mock/student.api.mock';
import { EduPlanStudentsGroupPage } from '../page-objects/eduplan-student-group.page';
import { EduPlanViewPage } from '../page-objects/eduplan-view.page';
import { PlanApiMock } from '../utils/mock/plan.api.mock';

interface AcademyFixtures {
  academyInit: AcademyInit;
  lessonPage: ActivityLessonPage;
  descPage: EduPlanDescPage;
  eventPage: EduPlanEventsPage;
  studentsPage: EduPlanStudentsPage;
  studentsGroupPage: EduPlanStudentsGroupPage;
  planViewPage: EduPlanViewPage;
  descApiMock: DescApiMock;
  teachersPage: EduPlanTeachersPage;
  eventApiMock: EventApiMock;
  teacherApiMock: TeacherApiMock;
  lessonApiMock: LessonApiMock;
  studentApiMock: StudentApiMock;
  planApiMock: PlanApiMock;
  helper: CommonHelper;
  generator: DataGenerator;
}

export const test = base.extend<AcademyFixtures>({
  academyInit: [
    async ({ browser }, use): Promise<void> => {
      const academyInit = await AcademyInit.create(browser);
      await use(academyInit);
      await academyInit.currentPage.close();
    },
    { auto: true },
  ],

  lessonPage: async ({ academyInit, baseURL }, use) => {
    await use(new ActivityLessonPage(academyInit.page, baseURL || ''));
  },

  descPage: async ({ academyInit, baseURL }, use) => {
    await use(new EduPlanDescPage(academyInit.page, baseURL || ''));
  },

  eventPage: async ({ academyInit, baseURL }, use) => {
    await use(new EduPlanEventsPage(academyInit.page, baseURL || ''));
  },

  teachersPage: async ({ academyInit, baseURL }, use) => {
    await use(new EduPlanTeachersPage(academyInit.page, baseURL || ''));
  },

  studentsPage: async ({ academyInit, baseURL }, use) => {
    await use(new EduPlanStudentsPage(academyInit.page, baseURL || ''));
  },

  studentsGroupPage: async ({ academyInit, baseURL }, use) => {
    await use(new EduPlanStudentsGroupPage(academyInit.page, baseURL || ''));
  },

  planViewPage: async ({ academyInit, baseURL }, use) => {
    await use(new EduPlanViewPage(academyInit.page, baseURL || ''));
  },

  descApiMock: async ({ academyInit }, use) => {
    await use(new DescApiMock(academyInit.page));
  },

  eventApiMock: async ({ academyInit }, use) => {
    await use(new EventApiMock(academyInit.page));
  },

  teacherApiMock: async ({ academyInit }, use) => {
    await use(new TeacherApiMock(academyInit.page));
  },

  lessonApiMock: async ({ academyInit }, use) => {
    await use(new LessonApiMock(academyInit.page));
  },

  studentApiMock: async ({ academyInit }, use) => {
    await use(new StudentApiMock(academyInit.page));
  },

  planApiMock: async ({ academyInit }, use) => {
    await use(new PlanApiMock(academyInit.page));
  },

  // eslint-disable-next-line no-empty-pattern
  helper: async ({}, use) => {
    await use(new CommonHelper());
  },

  // eslint-disable-next-line no-empty-pattern
  generator: async ({}, use) => {
    await use(new DataGenerator());
  },
});
