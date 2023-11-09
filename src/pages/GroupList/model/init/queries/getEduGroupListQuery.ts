import { order_by, query } from '@src/gql-client';
import { castNotSkeleton } from 'gqty';
import { EduGroupListInfo, GetEduGroupListParams, GroupInfo } from '@src/pages/GroupList/model/types';

type QueryArgsType = Parameters<typeof query.readStudentGroups>[0];

const toQueryArgs = (params: GetEduGroupListParams): QueryArgsType => {
  return {
    where: { deletedAt: { _is_null: true }, eduPlanId: { _eq: params.eduPlanId } },
    order_by: [{ title: order_by.asc }],
  };
};

const getEduGroupListItemCount = (queryArgs: QueryArgsType) => {
  const { aggregate } = castNotSkeleton(query.readStudentGroupsAggregate(queryArgs));
  return aggregate?.count() || 0;
};

const getEduGroupListItems = (queryArgs: QueryArgsType): GroupInfo[] => {
  return query.readStudentGroups(queryArgs).map(({ id, title }) => {
    return {
      id: id ?? '',
      title: title ?? '',
    };
  });
};

export const getEduGroupListQuery = (request: GetEduGroupListParams): EduGroupListInfo => {
  const queryArgs = toQueryArgs(request);

  const totalItemCount = getEduGroupListItemCount(queryArgs);

  const items = getEduGroupListItems({
    ...queryArgs,
    offset: request.state.pageIndex * request.state.pageSize,
    limit: request.state.pageSize,
  });

  return { totalItemCount, items };
};
