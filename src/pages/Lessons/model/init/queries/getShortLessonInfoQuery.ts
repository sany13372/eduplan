import { query } from '@src/gql-client';
import { LessonItemShort } from '@src/pages/Lessons/model/types';
import { castNotSkeletonDeep } from 'gqty';

export const getShortLessonInfoQuery = (lessonId: string, lessonData: LessonItemShort): LessonItemShort => {
  const resp = query.readEduLessons({
    where: {
      id: { _eq: lessonId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить информацию');
  const { id, kind, title } = castNotSkeletonDeep(resp[0]);
  return {
    ...lessonData,
    id,
    title,
    eduKind: {
      id: kind?.themeLessonKind?.id ?? '',
      caption: kind?.themeLessonKind?.title ?? '',
    },
  };
};
