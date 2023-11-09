import { order_by, query } from '@src/gql-client';
import { Reference } from '@src/types';

type QueryArgsType = Parameters<typeof query.readStudentGroups>[0];

export const getEduGroupInfo = (queryArgs: QueryArgsType): Reference[] => {
  return query.readStudentGroups(queryArgs).map(({ id, title }) => {
    return {
      id: id ?? '',
      caption: title ?? '',
    };
  });
};

export const getEduGroupsInfoQuery = (eduPlanId: string): Reference[] => {
  const queryArgs = {
    where: { deletedAt: { _is_null: true }, eduPlanId: { _eq: eduPlanId } },
    order_by: [{ title: order_by.asc }],
  };

  return getEduGroupInfo({
    ...queryArgs,
  });
};
