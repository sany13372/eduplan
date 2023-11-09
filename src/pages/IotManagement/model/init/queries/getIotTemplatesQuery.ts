import { order_by, query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { GetTemplatesParams, IotTemplateData } from '@src/pages/IotManagement/model/types';
import sortBy from 'lodash/sortBy';

export const getIotTemplatesQuery = ({ planId, gridElementId }: GetTemplatesParams): IotTemplateData[] => {
  const resp = query.readEduTrajectoryTemplates({
    where: {
      eduPlanId: { _eq: planId },
      eduGridItemId: { _eq: gridElementId },
      deletedAt: { _is_null: true },
    },
    order_by: [{ createdAt: order_by.desc }],
  });

  if (!resp) throw new Error('Не удалось найти запрашиваемый элемент');

  const items: IotTemplateData[] = resp.map((e) => {
    const { id, title, eduGridItemId, templateRows } = castNotSkeletonDeep(e);

    return {
      id,
      caption: title,
      eduGridElementId: eduGridItemId,
      rows: sortBy(templateRows(), 'priority').map(({ eduPlanRow }) => ({
        id: eduPlanRow?.id ?? '',
        caption: eduPlanRow?.activity?.title ?? '',
      })),
    };
  });

  return items;
};
