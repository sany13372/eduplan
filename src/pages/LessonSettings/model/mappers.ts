import { GradeElement, Lesson, ScoreInfo, Stream, Theme } from '@src/pages/LessonSettings/model/types';
import {
  ActivityLessonWrapperType,
  ActivityThemeWrapperType,
  ControlForm,
  EduLessonImplSettingType,
  GradeScaleElement,
  LessonScoreType,
  Maybe,
} from '@src/gql-client';
import { isNotEmpty } from '@utils/typescriptUtils';
import { Reference } from '@src/types';
import partial from 'lodash/partial';
import flatten from 'lodash/flatten';
import { isValidDate } from '@utils/date';
import { defaultControlForm } from '@src/pages/LessonSettings/model/constants';
import sortBy from 'lodash/sortBy';

const activityLessonTypeToLesson = (themeId: string, item: Maybe<ActivityLessonWrapperType>): Lesson | null => {
  if (!isNotEmpty(item) || !isNotEmpty(item.lesson)) return null;
  const { title, lessonId, lessonKind, rowId, isContentAdded, isAllowRegistration } = item.lesson;
  return {
    id: lessonId ?? '',
    lessonKind: {
      id: lessonKind?.id ?? '',
      caption: lessonKind?.title ?? '',
      systemCode: lessonKind?.systemCode ?? '',
    },
    rowId: rowId ?? '',
    isContentAdded: Boolean(isContentAdded),
    isAllowRegistration: Boolean(isAllowRegistration),
    title: title ?? '',
    themeId,
  };
};

const themeWrapperToTheme = (item: ActivityThemeWrapperType): Theme => {
  const { theme, lessonWrappers } = item;
  const activityLessonTypeToLessonPartial = partial(activityLessonTypeToLesson, theme?.themeId ?? '');

  return {
    id: theme?.themeId ?? '',
    rowId: theme?.rowId ?? '',
    title: theme?.title ?? '',
    priority:theme?.priority ?? null,
    lessons: (lessonWrappers ?? []).map(activityLessonTypeToLessonPartial).filter(isNotEmpty),
  };
};

export const themeWrapperListToThemeList = (resp: Maybe<ActivityThemeWrapperType>[]): Theme[] =>
  sortBy(resp.filter(isNotEmpty).map(themeWrapperToTheme),(them) => them.priority);

const themeWrapperToReference = (item: ActivityThemeWrapperType): Reference => {
  const { theme } = item;
  return {
    id: theme?.themeId ?? '',
    caption: theme?.title ?? '',
  };
};

export const themeWrapperListToReferenceList = (resp: Maybe<ActivityThemeWrapperType>[]): Reference[] =>
  resp.filter(isNotEmpty).map(themeWrapperToReference);

export const eduSettingToStream = (themeId: string, lessonId: string, item: EduLessonImplSettingType): Stream => {
  const {
    id,
    title,
    isAllowAlways,
    eduLessonImplId,
    endDate,
    startDate,
    passDate,
    isPublic,
    studentsCount,
    implementationEmployees,
  } = item;
  const end = new Date(endDate ?? '');
  const start = new Date(startDate ?? '');
  const pass = new Date(passDate ?? '');
  return {
    id: id ?? '',
    title: title ?? '',
    isAllowAlways: Boolean(isAllowAlways),
    isPublic: Boolean(isPublic),
    lessonId,
    themeId,
    lessonImplId: eduLessonImplId ?? '',
    startDate: isValidDate(start) ? start : null,
    endDate: isValidDate(end) ? end : null,
    passDate: isValidDate(pass) ? pass : null,
    studentCount: studentsCount ?? 0,
    teacherList: implementationEmployees?.map((e) => e?.employeeFullName).filter(isNotEmpty) ?? [],
  };
};

export const activityLessonToStream = (themeId: string, item: Maybe<ActivityLessonWrapperType>): Stream[] | null => {
  if (!item || !item?.lesson) return null;
  const { lesson, implementationSettings } = item;

  const eduSettingToStreamPartial = partial(eduSettingToStream, themeId, lesson.lessonId ?? '');
  return implementationSettings?.filter(isNotEmpty).map(eduSettingToStreamPartial) ?? [];
};

export const themeWrapperToStreamList = (theme: ActivityThemeWrapperType): Stream[] => {
  const lessons = theme?.lessonWrappers ?? [];
  const activityLessonToStreamPartial = partial(activityLessonToStream, theme.theme?.themeId ?? '');
  return flatten(lessons.map(activityLessonToStreamPartial).filter(isNotEmpty));
};

export const themeWrapperListToStreamList = (resp: Maybe<ActivityThemeWrapperType>[]): Stream[] => {
  const themes = resp.filter(isNotEmpty);
  return flatten(themes.map(themeWrapperToStreamList));
};

export const lessonScoreToScoreInfo = (scoreSetting: LessonScoreType, themeId: string, lessonId: string): ScoreInfo => {
  return {
    themeId,
    lessonId,
    contentScoreValue: scoreSetting?.contentScoreValue ?? 0,
    lessonScoreValue: scoreSetting?.lessonScoreValue ?? 0,
    controlForm: scoreSetting?.controlForm
      ? {
          id: scoreSetting?.controlForm?.id ?? '',
          caption: scoreSetting?.controlForm?.title ?? '',
          systemCode: scoreSetting?.controlForm?.systemCode ?? '',
        }
      : defaultControlForm,
    gradeScale: {
      id: scoreSetting?.gradeScale?.id ?? '',
      caption: scoreSetting?.gradeScale?.title ?? '',
      systemCode: scoreSetting?.gradeScale?.systemCode ?? '',
    },
    gradeSettings: (scoreSetting?.gradeSettings ?? []).map((e) => ({
      val: e?.scoreValue ?? 0,
      item: {
        id: e?.gradeScaleElement?.id ?? '',
        caption: e?.gradeScaleElement?.title ?? '',
        systemCode: e?.gradeScaleElement?.systemCode ?? '',
        gradeId: e?.gradeScaleElementId ?? '',
      },
    })),
  };
};
export const activityLessonToScoreInfo = (
  themeId: string,
  item: Maybe<ActivityLessonWrapperType>,
): ScoreInfo | null => {
  if (!item || !item?.lesson || !item.scoreSetting) return null;
  const { lesson, scoreSetting } = item;

  return lessonScoreToScoreInfo(scoreSetting, themeId, lesson?.lessonId ?? '');
};

export const themeWrapperToScoreInfoList = (theme: ActivityThemeWrapperType): ScoreInfo[] => {
  const lessons = theme?.lessonWrappers ?? [];
  const activityLessonToScoreInfoPartial = partial(activityLessonToScoreInfo, theme.theme?.themeId ?? '');
  return lessons.map(activityLessonToScoreInfoPartial).filter(isNotEmpty);
};

export const themeWrapperListToScoreInfoList = (resp: Maybe<ActivityThemeWrapperType>[]): ScoreInfo[] => {
  const themes = resp.filter(isNotEmpty);
  return flatten(themes.map(themeWrapperToScoreInfoList));
};

export const dictItemListToReferenceExtList = <T extends Pick<ControlForm, 'id' | 'systemCode' | 'title'>>(
  val: Maybe<T[]>,
) => {
  if (!val) return [];
  return val
    .map((e) => ({
      id: e?.id ?? '',
      systemCode: e?.systemCode ?? '',
      caption: e?.title ?? '',
    }))
    .filter(isNotEmpty);
};

export const dictItemListToGridElementList = (val: Maybe<GradeScaleElement[]>): GradeElement[] => {
  if (!val) return [];
  return val
    .map((e) => ({
      id: e?.id ?? '',
      systemCode: e?.systemCode ?? '',
      caption: e?.title ?? '',
      gradeId: e?.gradeScaleId ?? '',
    }))
    .filter(isNotEmpty);
};
