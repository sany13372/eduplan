import { mutation } from '@src/gql-client';
import { LessonItemShort } from '@src/pages/Lessons/model/types';

export const updateLessonMutation = ({ eduKind, title, id = '' }: LessonItemShort): string => {
  const resp = mutation.editEduLesson({
    lesson: {
      id,
      title: title.trim(),
      kindId: eduKind?.id ?? '',
    },
  });
  return resp?.id ?? '';
};
