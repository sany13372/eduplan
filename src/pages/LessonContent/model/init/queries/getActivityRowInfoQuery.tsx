import { Lesson } from '@src/pages/LessonContent/model/types';
import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';

export const getActivityRowInfoQuery = (lessonId: string): Pick<Lesson, 'themeId' | 'planId' | 'activityId'> => {
  const resp = query.readEduPlanActivityRows({
    where: {
      lesson: {
        id: { _eq: lessonId },
      },
      deletedAt: { _is_null: true },
    },
  });
  if (resp.length === 0) throw new Error('Не удалось получить данные');
  const item = resp[0];
  const { id, eduPlanRow } = castNotSkeletonDeep(item);
  return {
    themeId: id,
    planId: eduPlanRow?.eduPlanId ?? '',
    activityId: eduPlanRow?.id ?? '',
  };
};
