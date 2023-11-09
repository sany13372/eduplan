import { order_by, query } from '@src/gql-client';
import { dictItemListToGridElementList } from '@src/pages/LessonSettings/model/mappers';
import { GradeElement } from '@src/pages/LessonSettings/model/types';

export const getScaleElementTypesQuery = (): GradeElement[] => {
  const resp = query.readGradeScaleElements({
    where: { deletedAt: { _is_null: true } },
    order_by: [{ priority: order_by.asc }],
  });
  return dictItemListToGridElementList(resp);
};
