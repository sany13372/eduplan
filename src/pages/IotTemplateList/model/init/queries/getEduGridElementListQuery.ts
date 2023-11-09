import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { EduGridElement } from '@src/pages/IotTemplateList/model/types';
import { castNotSkeletonDeep } from 'gqty';

export const getEduGridElementListQuery = (eduPlanId: string): EduGridElement[] => {
  const resp = query.readEduPlan({
    id: eduPlanId,
  });

  if (!resp) throw new Error('Удалось найти запрашиваемый элемент');

  const eduPlanInfo = castNotSkeletonDeep(resp);
  const items: EduGridElement[] = eduPlanInfo.eduGridElementItems().map((e) => {
    const { id, eduGridElementSetting } = castNotSkeletonDeep(e);
    return {
      id,
      caption: eduGridElementSetting?.eduGridElement?.title ?? '',
      priority: eduGridElementSetting?.eduGridElement?.priority ?? 0,
      planId: eduPlanInfo.id,
      progId: eduPlanInfo.eduProgramId,
      spaceId: eduPlanInfo.spaceId,
    };
  });

  return sortBy(items, (i) => i.priority);
};
