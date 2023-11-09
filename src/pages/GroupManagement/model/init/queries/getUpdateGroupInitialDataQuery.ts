import { castNotSkeletonDeep } from 'gqty';
import { query } from '@src/gql-client';
import { UpdateGroupInfo } from '@src/pages/GroupManagement/model/types';

export const getUpdateGroupInitialDataQuery = (eduGroupId: string): UpdateGroupInfo => {
  const resp = query.readStudentGroups({
    where: {
      id: { _eq: eduGroupId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить данные учебной группы');

  const { eduPlanId, spaceId, title, groupTypeId, id, studentGroupType } = castNotSkeletonDeep(resp[0]);
  return {
    id,
    eduPlanId,
    spaceId,
    title: title ?? '',
    groupType: {
      id: groupTypeId,
      caption: studentGroupType?.title ?? '',
    },
  };
};
