import { createDomain } from 'effector';
import { createDeleteActionNodes, createGetActionNodes } from '@utils/effector';
import { Lesson, LessonKindInfo, UploadScormParams } from '@src/pages/LessonContent/model/types';
import { status } from 'patronum';
import { defaultLessonKindConfig } from '@src/pages/LessonContent/model/constants';

export const LessonContentDomain = createDomain('LessonContentDomain');
export const resetDomain = LessonContentDomain.createEvent();
export const lessonInfoStore = createGetActionNodes<string, Lesson>(LessonContentDomain, {
  lessonId: '',
  activityId: '',
  isAllowRegistration: false,
  planId: '',
  themeId: '',
  title: '',
});

export const uploadScorm = LessonContentDomain.createEvent<UploadScormParams>();
export const uploadScormFx = LessonContentDomain.createEffect<UploadScormParams, boolean>();
export const $uploadScormStatus = status({ effect: uploadScormFx });
export const $scormPeviewIsActive = LessonContentDomain.createStore<boolean>(false);
export const setScormPeviewIsActiveValue = LessonContentDomain.createEvent<boolean>();
export const deleteSCORM = createDeleteActionNodes<string>(LessonContentDomain);
export const $uploadSCORMProgress = LessonContentDomain.createStore(0);
export const setUploadSCORMProgress = LessonContentDomain.createEvent<number>();

export const updateContentConstructor = LessonContentDomain.createEvent<string>();
export const updateContentConstructorFx = LessonContentDomain.createEffect<string, boolean>();
export const lessonKindInfoStore = createGetActionNodes<string, LessonKindInfo>(
  LessonContentDomain,
  defaultLessonKindConfig,
);
