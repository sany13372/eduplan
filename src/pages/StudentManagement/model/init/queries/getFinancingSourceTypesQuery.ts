import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { Sex } from '@src/pages/StudentManagement/model/types';

export const getFinancingSourceTypesQuery = (eduPlanId: string): Sex[] => {
  const items = query
    .readEduFinancingSourceSettings({
      where: {
        space: {
          eduPlans: { id: { _eq: eduPlanId } },
        },
        _or: [{ isDisabled: { _is_null: true } }, { isDisabled: { _eq: false } }],
      },
    })
    .map(castNotSkeleton)
    .map(({ itemId, eduFinancingSource }) => ({
      id: itemId || '',
      caption: eduFinancingSource?.title || '',
    }));

  return sortBy(items, (i) => i.caption);
};
