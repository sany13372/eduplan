import { order_by, query } from '@src/gql-client';
import { castNotSkeletonDeep, getFields } from 'gqty';
import { Activity, GetActivityListParams } from '@src/pages/IotTemplateManagement/model/types';
import sortBy from 'lodash/sortBy';

export const getActivityListQuery = ({ eduGridElementId: gridElement, planId }: GetActivityListParams): Activity[] => {
  const resp = query.readEduPlanRows({
    where: {
      eduPlanId: { _eq: planId },
      eduGridElementId: { _eq: gridElement },
      deletedAt: { _is_null: true },
    },
    order_by: [{ priority: order_by.asc }],
  });
  const activityList: Activity[] = resp.map(castNotSkeletonDeep).map((item) => {
    const { id, itemId, path, priority, isGroupItem, activity, activityGroup, eduGridElementId } = getFields(
      item,
      'activity',
      'activityGroup',
    );
    const groupTitle = activityGroup?.title ?? '';
    const activityTitle = activity?.title ?? '';
    const title = `${groupTitle}${activityTitle}`;
    return {
      id,
      eduGridElementId,
      activityId: itemId,
      activityTitle: title,
      path,
      priority,
      isGroup: isGroupItem,
      componentKind: activityGroup?.eduPlanComponentKindSetting?.eduPlanComponentKindSetting?.systemCode ?? '',
      childrens: [],
    };
  });

  return sortBy(activityList, 'priority');
};
