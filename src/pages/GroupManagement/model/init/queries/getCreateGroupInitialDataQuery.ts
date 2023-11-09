import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import { CreateGroupInfo } from '@src/pages/GroupManagement/model/types';

export const getCreateGroupInitialDataQuery = (eduPlanId: string): CreateGroupInfo => {
  const resp = query.readEduPlans({
    where: {
      id: { _eq: eduPlanId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить данные плана обучения');
  return {
    eduPlanId,
    spaceId: castNotSkeleton(resp[0]).spaceId,
    title: '',
  };
};
