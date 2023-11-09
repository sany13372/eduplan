import { LessonOrderEnum, query, ThemeWithLessonsOrderEnum } from '@src/gql-client';
import { ActivityInitData } from '@src/pages/LessonSettings/model/types';
import {
  themeWrapperListToReferenceList,
  themeWrapperListToThemeList,
  themeWrapperListToStreamList,
  themeWrapperListToScoreInfoList,
} from '@src/pages/LessonSettings/model/mappers';

export const getActivityInitInfoQuery = (eduPlanRowId: string): ActivityInitData => {
  const resp =
    query.getEduPlanRowThemeWithLessonsList({
      themeWithLessonsInput: {
        eduPlanRowId,
        orders: {
          themeOrders: [ThemeWithLessonsOrderEnum.CREATED_AT_ASC],
          lessonOrders: [LessonOrderEnum.CREATED_AT_ASC],
        },
      },
    }) ?? [];

  return {
    filters: themeWrapperListToReferenceList(resp),
    streams: themeWrapperListToStreamList(resp),
    themes: themeWrapperListToThemeList(resp),
    scores: themeWrapperListToScoreInfoList(resp),
  };
};
