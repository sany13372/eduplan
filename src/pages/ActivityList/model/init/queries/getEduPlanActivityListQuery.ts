import { order_by, query } from '@src/gql-client';
import { EduGridItem } from '@src/pages/ActivityList/model/types';
import { castNotSkeletonDeep } from 'gqty';

export const getEduPlanActivityListQuery = (eduProgId: string, eduGridId: string, eduPlanId: string): EduGridItem[] => {
  const resp = query.readEduPlanRows({
    where: {
      eduPlanId: { _eq: eduPlanId },
      deletedAt: { _is_null: true },
    },
    order_by: [{ path: order_by.asc }, { priority: order_by.asc }],
  });
  const eduGridItemList: EduGridItem[] = resp.map((el) => {
    const {
      id,
      isGroup,
      activityGroupTitle,
      activityId,
      activityTitle,
      activityGroupId,
      priority,
      path,
      eduGridElementId,
      efforts,
      componentKind,
    } = castNotSkeletonDeep({
      id: el.id,
      isGroup: el.isGroupItem,
      activityId: el.activity?.id,
      activityTitle: el.activity?.title,
      activityGroupId: el.activityGroup?.id,
      activityGroupTitle: el.activityGroup?.title,
      eduGridElementId: el.eduGridElementId,
      path: el.path,
      priority: el.priority,
      efforts: castNotSkeletonDeep(el.eduPlanRowHours()).map((e) => ({
        lessonKindId: e.lessonKindId,
        minutesAmount: e.minutesAmount,
        workKindId: e?.lessonKindSetting?.lessonKind?.lessontType?.eduWorkKindId ?? '',
      })),
      componentKind: el.activityGroup?.eduPlanComponentKindSetting?.eduPlanComponentKindSetting?.systemCode ?? '',
    });

    return {
      id,
      isGroup,
      activityId: isGroup ? activityGroupId : activityId,
      activityTitle: isGroup ? activityGroupTitle : activityTitle,
      eduGridElementId,
      path,
      orderNumber: 1,
      priority,
      childrens: [],
      efforts,
      componentKind,
    };
  });

  return eduGridItemList;
};
