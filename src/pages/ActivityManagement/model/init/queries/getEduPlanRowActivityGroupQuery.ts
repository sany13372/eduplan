import { query } from '@src/gql-client';
import { ShortActivityGroupInfo } from '@src/pages/ActivityManagement/model/types';
import { castNotSkeletonDeep } from 'gqty';

export const getEduPlanRowActivityGroupQuery = (id: string): ShortActivityGroupInfo | null => {
  const resp = query.readEduPlanRow({
    id,
  });
  if (!resp || (resp && !resp.activityGroup)) return null;
  const activityInfo: ShortActivityGroupInfo = castNotSkeletonDeep({
    eduPlanId: resp.eduPlanId,
    title: resp.activityGroup?.title,
    shortTitle: resp.activityGroup?.shortTitle,
    id,
    eduGridElementId: resp.eduGridElementId,
    component: {
      id: resp.activityGroup?.eduPlanComponentKindSetting?.eduPlanComponentKindSetting?.id,
      caption: resp.activityGroup?.eduPlanComponentKindSetting?.eduPlanComponentKindSetting?.title,
    },
  });
  return activityInfo;
};
