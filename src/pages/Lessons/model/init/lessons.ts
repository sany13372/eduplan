import { connectGetActionNodes } from '@utils/effector';
import { LessonContentTypes, resolved } from '@src/gql-client';
import { resetDomain } from '@src/pages/GroupList/model';
import { ThemeWithLessons } from '@src/pages/Lessons/model/types.new';
import {
  activityName,
  confirmLesson,
  deleteLesson,
  saveLessonDoneEdit,
  saveLessonDoneNew,
  themesWithLessons,
} from '@src/pages/Lessons/model';
import { getActivityNameQuery, getThemesWithLessonsListQuery } from '@src/pages/Lessons/model/init/queries';

connectGetActionNodes<string, ThemeWithLessons[]>({
  nodes: themesWithLessons,
  handler: (eduPlanRowId) => resolved(() => getThemesWithLessonsListQuery(eduPlanRowId), { noCache: true }),
  resetOn: [resetDomain],
});

connectGetActionNodes<string, string>({
  nodes: activityName,
  handler: async (id) => resolved(() => getActivityNameQuery(id), { noCache: true }),
  resetOn: [resetDomain],
});

type ReplaceParams<T extends { id: string }, K extends keyof T> = {
  id: string;
  idKey?: K;
  replace: (item: T) => T;
};

function replaceById<T extends { id: string }, K extends keyof T>(
  arr: T[],
  { id, replace, idKey }: ReplaceParams<T, K>,
) {
  const idx = arr.findIndex((item) => item[idKey || 'id'] === id);
  if (idx === -1) return arr;
  const copy = arr.slice();
  copy[idx] = replace(copy[idx]);
  return copy;
}

themesWithLessons.$value.on(deleteLesson.deleteFx.done, (themes, { params: { themeId, lessonId } }) => {
  return replaceById(themes, {
    id: themeId,
    replace: (theme) => ({
      ...theme,
      lessonsCount: theme.lessonsCount - 1,
      lessons: theme.lessons.filter((lesson) => lesson.id !== lessonId),
    }),
  });
});

themesWithLessons.$value.on(
  confirmLesson.updateFx.done,
  (themes, { params: { lessonId, themeId, isAllowRegistration } }) => {
    return replaceById(themes, {
      id: themeId,
      replace: (theme) => ({
        ...theme,
        lessons: replaceById(theme.lessons, {
          id: lessonId,
          replace: (lesson) => ({
            ...lesson,
            isAllowRegistration: !isAllowRegistration,
          }),
        }),
      }),
    });
  },
);

themesWithLessons.$value.on(saveLessonDoneEdit, (themes, { params: lesson }) => {
  return replaceById(themes, {
    id: lesson.themeId,
    idKey: 'rowId',
    replace: (theme) => ({
      ...theme,
      lessons: replaceById(theme.lessons, {
        id: lesson.id ?? '',
        replace: (prev) => ({
          ...prev,
          title: lesson.title,
          kind: lesson.eduKind?.caption ?? '',
        }),
      }),
    }),
  });
});

themesWithLessons.$value.on(saveLessonDoneNew, (themes, { params: lesson, result: createdId }) => {
  return replaceById(themes, {
    id: lesson.themeId,
    idKey: 'rowId',
    replace: (theme) => ({
      ...theme,
      lessonsCount: theme.lessonsCount + 1,
      lessons: [
        ...theme.lessons,
        {
          id: createdId,
          title: lesson.title,
          hasContent: false,
          isAllowRegistration: false,
          kind: lesson.eduKind?.caption ?? '',
          lessonContentType: LessonContentTypes.CONTENT_CONSTRUCTOR,
          isScorm: false,
          priority: lesson.priority ?? null,
          rowId: lesson.rowId ?? '',
        },
      ],
    }),
  });
});
