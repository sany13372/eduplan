import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { ViewActivityInfo } from '@src/pages/ActivityManagement/model/types';

export const getActivityInfoQuery = (activityId: string): ViewActivityInfo => {
  const resp = query.readEduPlanRow({
    id: activityId,
  });

  if (!resp || resp.deletedAt || !resp.activity)
    throw new Error('Не удалось получить данные мероприятия плана обучения');

  const { id, activity, eduGridElementItem } = castNotSkeletonDeep(resp);
  return {
    id,
    title: activity?.title ?? '',
    shortTitle: activity?.shortTitle ?? '',
    category: {
      id: activity?.eduPlanRegistryElemCategorySetting?.eduPlanRegistryElemCategory?.id ?? '',
      caption: activity?.eduPlanRegistryElemCategorySetting?.eduPlanRegistryElemCategory?.title ?? '',
    },
    eduGridElementTitle: eduGridElementItem?.eduGridElementSetting?.eduGridElement?.title ?? '',
    activityId: activity?.id ?? '',
  };
};
