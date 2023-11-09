import { castNotSkeletonDeep } from 'gqty';
import { query } from '@src/gql-client';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';

export const getUpdateIotTemplateInitialDataQuery = (iotTemplateId: string): IotTemplate => {
  const resp = query.readEduTrajectoryTemplate({
    id: iotTemplateId,
  });

  if (!resp || resp.deletedAt) throw new Error('Не удалось получить данные шаблона');

  const { title, id, eduGridItemId, templateRows, spaceId, eduPlanId } = castNotSkeletonDeep(resp);
  return {
    id,
    title,
    spaceId,
    planId: eduPlanId,
    eduGridElementId: eduGridItemId,
    rows: templateRows().map((e) => ({
      id: e?.eduPlanRow?.id ?? '',
      path: e?.eduPlanRow?.path ?? '',
    })),
  };
};
