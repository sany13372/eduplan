import { query } from '@src/gql-client';
import { EduPlanRowShortInfo } from '@src/pages/Lessons/model/types';

export const getActivityRowShortInfoQuery = (activityRowId: string): EduPlanRowShortInfo => {
  const resp = query.readEduPlanActivityRows({
    where: {
      id: { _eq: activityRowId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить информацию');
  const item = resp[0];
  return {
    id: item.eduPlanRowId ?? '',
    eduPlanId: item.eduPlanRow?.eduPlanId ?? '',
  };
};
