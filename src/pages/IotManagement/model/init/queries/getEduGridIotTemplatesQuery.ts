import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { GridElementTemplateCount } from '@src/pages/IotManagement/model/types';

export const getEduGridIotTemplatesQuery = (eduPlanId: string): GridElementTemplateCount => {
  const resp = query.readEduTrajectoryTemplates({
    where: {
      eduPlanId: { _eq: eduPlanId },
    },
  });

  if (!resp) throw new Error('Не удалось найти запрашиваемый элемент');

  const templateCountData: GridElementTemplateCount = {};

  resp.map(castNotSkeletonDeep).forEach(({ eduGridItemId }) => {
    if (!templateCountData[eduGridItemId]) templateCountData[eduGridItemId] = 0;
    templateCountData[eduGridItemId] += 1;
  });

  return templateCountData;
};
