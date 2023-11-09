import { query } from '@src/gql-client';

export const getActivityNameQuery = (eduPlanRowId: string): string => {
  const resp = query.readEduPlanRows({
    where: {
      id: { _eq: eduPlanRowId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('не удалось получить информацию');
  return resp[0]?.activity?.title ?? '';
};
