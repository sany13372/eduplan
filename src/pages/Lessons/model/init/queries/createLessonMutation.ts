import { mutation } from '@src/gql-client';
import { LessonItemShort } from '@src/pages/Lessons/model/types';

export const createLessonMutation = ({ eduKind, title, themeId }: LessonItemShort): string => {
  const resp = mutation.addEduLesson({
    lesson: {
      parentRowId: themeId,
      title: title.trim(),
      kindId: eduKind?.id ?? '',
    },
  });
  return resp?.id ?? '';
};
