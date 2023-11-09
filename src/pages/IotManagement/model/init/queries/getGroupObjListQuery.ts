import { order_by, query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { GroupObj } from '@src/pages/IotManagement/model/types';

export const getGroupObjListQuery = (eduPlanId: string): GroupObj[] => {
  const resp = query.readStudentGroups({
    where: {
      eduPlanId: { _eq: eduPlanId },
      deletedAt: { _is_null: true },
    },
    order_by: [{ title: order_by.asc }],
  });

  if (!resp) throw new Error('Не удалось найти запрашиваемый элемент');

  return resp.map(castNotSkeletonDeep).map(({ title, id }) => {
    return {
      id,
      caption: title ?? '',
    };
  });
};
