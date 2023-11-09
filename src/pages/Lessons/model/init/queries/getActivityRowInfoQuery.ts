import { query } from '@src/gql-client';
import { LessonItemShort } from '@src/pages/Lessons/model/types';

export const getActivityRowInfoQuery = (activityRowId: string): LessonItemShort => {
  const resp = query.readEduPlanActivityRows({
    where: {
      id: { _eq: activityRowId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить информацию');
  const item = resp[0];
  return {
    eduPlanId: item.eduPlanRow?.eduPlanId ?? '',
    eduPlanRowId: item.eduPlanRowId ?? '',
    title: '',
    themeId: activityRowId,
    priority:item.priority ?? null
  };
};
