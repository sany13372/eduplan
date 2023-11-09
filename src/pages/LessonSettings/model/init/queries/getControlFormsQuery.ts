import { ReferenceExt } from '@src/pages/LessonSettings/model/types';
import { order_by, query } from '@src/gql-client';
import { dictItemListToReferenceExtList } from '@src/pages/LessonSettings/model/mappers';

export const getControlFormsQuery = (): ReferenceExt[] => {
  const resp = query.readControlForms({
    where: { deletedAt: { _is_null: true } },
    order_by: [{ priority: order_by.asc }],
  });
  return dictItemListToReferenceExtList(resp);
};
