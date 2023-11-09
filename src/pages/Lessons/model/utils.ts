import { Lesson } from '@src/pages/Lessons/model/types';
import { LessonContentTypes } from '@src/gql-client';
import { MfeRoutes } from '@constants/routes';

export const getImplIdList = (data: Lesson[]): string[] => {
  const resp: string[] = [];
  data.forEach((e) => {
    if (e.elementType === 'lesson' && e.itemInfo.settings?.implId) resp.push(e.itemInfo.settings.implId);
  });
  return resp;
};

export const addItems = (currentVal: string[], idList: string[]): string[] => {
  return Array.from(new Set([...currentVal, ...idList]));
};

export const removeItems = (currentVal: string[], idList: string[]): string[] => {
  return currentVal.filter((e) => !idList.includes(e));
};

export const getParentId = (path: string): string => {
  const pathArr = path.split('.');
  const pathLen = pathArr.length;
  return pathLen >= 2 ? pathArr[pathLen - 2] : '';
};

export const getLessonContentRoute = (lessonContentType: LessonContentTypes) => {
  switch (lessonContentType) {
    case LessonContentTypes.CONTENT_CONSTRUCTOR:
      return MfeRoutes.LESSON_INFO_CONTENT_CONSTRUCTOR;
    case LessonContentTypes.OLD_SCORM:
      return MfeRoutes.LESSON_INFO_CONTENT;
    case LessonContentTypes.TEST_CONSTRUCTOR:
      return MfeRoutes.LESSON_INFO_TEST_CONSTRUCTOR;
    default:
      return MfeRoutes.LESSON_INFO_CONTENT_CONSTRUCTOR;
  }
};
