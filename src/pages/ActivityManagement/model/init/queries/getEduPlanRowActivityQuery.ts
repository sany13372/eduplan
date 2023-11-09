import { query } from '@src/gql-client';
import { ShortActivityInfo } from '@src/pages/ActivityManagement/model/types';
import { castNotSkeletonDeep } from 'gqty';

export const getEduPlanRowActivityQuery = (id: string): ShortActivityInfo | null => {
  const resp = query.readEduPlanRow({
    id,
  });
  if (!resp || (resp && !resp.activity)) return null;
  const activityInfo: ShortActivityInfo = castNotSkeletonDeep({
    eduPlanId: resp.eduPlanId,
    title: resp.activity?.title,
    shortTitle: resp.activity?.shortTitle,
    id,
    eduGridElementId: resp.eduGridElementId,
    category: {
      id: resp.activity?.eduPlanRegistryElemCategorySetting?.eduPlanRegistryElemCategory?.id,
      caption: resp.activity?.eduPlanRegistryElemCategorySetting?.eduPlanRegistryElemCategory?.title,
    },
    path: null,
  });
  return activityInfo;
};
