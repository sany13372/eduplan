import { order_by, query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { IotTemplateData } from '@src/pages/IotTemplateList/model/types';
import { castNotSkeletonDeep } from 'gqty';

export const getIotTemplateListQuery = (eduPlanId: string): IotTemplateData[] => {
  const resp = query.readEduTrajectoryTemplates({
    where: {
      eduPlanId: { _eq: eduPlanId },
      deletedAt: { _is_null: true },
    },
    order_by: [{ createdAt: order_by.desc }],
  });

  if (!resp) throw new Error('Не удалось найти запрашиваемый элемент');

  const items: IotTemplateData[] = resp.map((e) => {
    const { id, title, eduGridItemId, templateRows } = castNotSkeletonDeep(e);

    return {
      id,
      title,
      eduGridElementId: eduGridItemId,
      rows: sortBy(templateRows(), 'priority').map(({ eduPlanRow }) => ({
        id: eduPlanRow?.id ?? '',
        caption: eduPlanRow?.activity?.title ?? '',
      })),
    };
  });

  return items;
};
