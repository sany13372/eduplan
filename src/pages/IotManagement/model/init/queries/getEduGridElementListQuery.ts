import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { castNotSkeletonDeep } from 'gqty';
import { EduGridElementData } from '@src/pages/IotManagement/model/types';

export const getEduGridElementListQuery = (eduPlanId: string): EduGridElementData[] => {
  const resp = query.readEduPlan({
    id: eduPlanId,
  });

  if (!resp) throw new Error('Не удалось найти запрашиваемый элемент');

  const eduPlanInfo = castNotSkeletonDeep(resp);
  const items: EduGridElementData[] = sortBy(eduPlanInfo.eduGridElementItems(), 'priority').map((e) => {
    const { id, eduGridElementSetting, eduPlanId: planId } = castNotSkeletonDeep(e);
    return {
      id,
      caption: eduGridElementSetting?.eduGridElement?.title ?? '',
      priority: eduGridElementSetting?.eduGridElement?.priority ?? 0,
      iotTemplateCount: 0,
      planId,
    };
  });

  return sortBy(items, (i) => i.priority);
};
