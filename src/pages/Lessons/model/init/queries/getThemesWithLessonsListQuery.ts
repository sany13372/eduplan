import {
  ActivityLessonWrapperType,
  ActivityThemeWrapperType,
  LessonContentTypes,
  LessonOrderEnum,
  query,
  ThemeWithLessonsOrderEnum,
} from '@src/gql-client';
import { Lesson, ThemeWithLessons } from '@src/pages/Lessons/model/types.new';
import sortBy from 'lodash/sortBy';

type BaseSort = {
  priority: number | null;
};

const sort = <T extends BaseSort>(arg: T[]) => sortBy(arg, (r) => r.priority);

function mapToLesson(lesson?: ActivityLessonWrapperType | null): Lesson {
  return {
    id: lesson?.lesson?.lessonId ?? '',
    title: lesson?.lesson?.title ?? '',
    kind: lesson?.lesson?.lessonKind?.title ?? '',
    hasContent: Boolean(lesson?.lesson?.isContentAdded),
    isAllowRegistration: Boolean(lesson?.lesson?.isAllowRegistration),
    lessonContentType: lesson?.lesson?.lessonKind?.lessonContentType || LessonContentTypes.CONTENT_CONSTRUCTOR,
    isScorm: Boolean(lesson?.lesson?.lessonKind?.isScorm),
    rowId: lesson?.lesson?.rowId ?? '',
    priority: lesson?.lesson?.priority ?? 0,
  };
}

function mapToTheme(themeWrapper?: ActivityThemeWrapperType | null): ThemeWithLessons {
  const sortedLessons = sort(themeWrapper?.lessonWrappers?.map(mapToLesson) || []);
  return {
    id: themeWrapper?.theme?.themeId ?? '',
    rowId: themeWrapper?.theme?.rowId ?? '',
    title: themeWrapper?.theme?.title ?? '',
    lessonsCount: themeWrapper?.theme?.lessonsCount ?? 0,
    lessons: sortedLessons,
    priority: themeWrapper?.theme?.priority ?? null,
  };
}

export const getThemesWithLessonsListQuery = (eduPlanRowId: string): ThemeWithLessons[] => {
  const resp = query.getEduPlanRowThemeWithLessonsList({
    themeWithLessonsInput: {
      eduPlanRowId,
      orders: {
        themeOrders: [ThemeWithLessonsOrderEnum.PRIORITY_DESC, ThemeWithLessonsOrderEnum.CREATED_AT_ASC],
        lessonOrders: [LessonOrderEnum.PRIORITY_ASC, LessonOrderEnum.CREATED_AT_ASC],
      },
    },
  });

  return sort(resp?.map(mapToTheme) || []);
};
