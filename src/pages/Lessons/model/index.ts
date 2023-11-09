import { createDomain, createStore } from 'effector';
import { createGate } from 'effector-react';
import {
  createAddActionNodes,
  createDeleteActionNodes,
  createGetActionNodes,
  createReferenceListNodes,
  createUpdateActionNodes,
} from '@utils/effector';
import {
  EduPlanRowShortInfo,
  GetLessonInitDataParams,
  GetSettingsInitDataParams,
  GetStudentListParams,
  LessonItem,
  LessonItemShort,
  LessonSettingExt,
  LessonUpdatePriority,
  SelectedImplsInfo,
  SelectedImplsParams,
  SelectedStudents,
  StudentListInfo,
} from '@src/pages/Lessons/model/types';
import { ThemeWithLessons } from '@src/pages/Lessons/model/types.new';
import { Reference } from '@src/types';

import { defaultObj, defaultStudentListInfo } from './constants';

export const LessonListDomain = createDomain('LessonListDomain');
export const resetDomain = LessonListDomain.createEvent();

export const themesWithLessons = createGetActionNodes<string, ThemeWithLessons[]>(LessonListDomain, []);
export const activityName = createGetActionNodes<string, string>(LessonListDomain, '');

export const $filters = LessonListDomain.createStore<Reference[]>([defaultObj]);
export const setThemeFilter = LessonListDomain.createEvent<Reference[]>();

export const deleteLesson = createDeleteActionNodes<{ lessonId: string; themeId: string }>(LessonListDomain);

export const saveLesson = createAddActionNodes<LessonItemShort>(LessonListDomain);
export const lessonUpdatePriority = createUpdateActionNodes<LessonUpdatePriority>(LessonListDomain);
export const saveLessonInitialData = createGetActionNodes<GetLessonInitDataParams, LessonItemShort | null>(
  LessonListDomain,
  null,
);
export const saveLessonDoneEdit = saveLesson.addFx.done.filter({ fn: ({ params: data }) => Boolean(data.id) });
export const saveLessonDoneNew = saveLesson.addFx.done.filter({ fn: ({ params: data }) => !data.id });

export const eduKindStore = createReferenceListNodes<string>(LessonListDomain);

export const saveSettings = createAddActionNodes<LessonSettingExt>(LessonListDomain);
export const saveSettingsInitialData = createGetActionNodes<GetSettingsInitDataParams, LessonSettingExt | null>(
  LessonListDomain,
  null,
);

export const publicateLesson = createUpdateActionNodes<LessonItem>(LessonListDomain);
export const confirmLesson =
  createUpdateActionNodes<{ lessonId: string; themeId: string; isAllowRegistration: boolean }>(LessonListDomain);

export const $selectedImpls = LessonListDomain.createStore<SelectedImplsInfo>({});
export const setSelectedImpls = LessonListDomain.createEvent<SelectedImplsParams>();

export const eduPlanRowData = createGetActionNodes<string, EduPlanRowShortInfo | null>(LessonListDomain, null);
export const resetEduPlanRowData = LessonListDomain.createEvent();

export const studentListInfo = createGetActionNodes<GetStudentListParams, StudentListInfo>(
  LessonListDomain,
  defaultStudentListInfo,
);
export const resetStudentListInfo = LessonListDomain.createEvent();

export const linkedUsersInitialValue = createGetActionNodes<string, string[]>(LessonListDomain, []);
export const updateLinkedStudents = createUpdateActionNodes<SelectedStudents>(LessonListDomain);
export const updateLinkedStudentsInitialData = createGetActionNodes<string, string[]>(LessonListDomain, []);

export type SaveLessonParams = {
  themeId: string;
  lessonId?: string;
};

export const showSaveLessonForm = LessonListDomain.createEvent<SaveLessonParams>();

export const closeSaveLessonForm = LessonListDomain.createEvent();

export const $saveLessonParams = createStore<SaveLessonParams | null>(null);

export const SaveLessonGate = createGate<SaveLessonParams>({ name: 'SaveLesson', domain: LessonListDomain });

export const LessonsGate = createGate<{ eduPlanRowId: string }>({ name: 'Lessons', domain: LessonListDomain });
