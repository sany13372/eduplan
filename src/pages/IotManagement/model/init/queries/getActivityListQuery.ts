import { order_by, query } from '@src/gql-client';
import { castNotSkeletonDeep, getFields } from 'gqty';
import { Activity } from '@src/pages/IotManagement/model/types';
import sortBy from 'lodash/sortBy';

export const getActivityListQuery = (eduPlanId: string): Activity[] => {
  const resp = query.readEduPlanRows({
    where: {
      eduPlanId: { _eq: eduPlanId },
      deletedAt: { _is_null: true },
    },
    order_by: [{ priority: order_by.asc }],
  });
  const activityList: Activity[] = resp.map(castNotSkeletonDeep).map((item) => {
    const { id, itemId, path, priority, isGroupItem, activity, activityGroup, eduGridElementId } = getFields(
      item,
      'activity',
      'activityGroup',
      'isGroupItem',
    );
    const groupTitle = activityGroup?.title ?? '';
    const activityTitle = activity?.title ?? '';
    return {
      id,
      gridElementId: eduGridElementId,
      activityId: itemId,
      activityTitle,
      activityGroupTitle: groupTitle,
      path,
      priority,
      isGroup: isGroupItem,
      componentKind: activityGroup?.eduPlanComponentKindSetting?.eduPlanComponentKindSetting?.systemCode ?? '',
      childrens: [],
    };
  });

  return sortBy(activityList, 'priority');
};
