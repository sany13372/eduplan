import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { Sex } from '@src/pages/StudentManagement/model/types';

export const getSexTypesQuery = (eduPlanId: string): Sex[] => {
  const items = query
    .readSexSettings({
      where: {
        space: {
          eduPlans: { id: { _eq: eduPlanId } },
        },
        _or: [{ isDisabled: { _is_null: true } }, { isDisabled: { _eq: false } }],
      },
    })
    .map(castNotSkeleton)
    .map(({ itemId, sex }) => ({
      id: itemId || '',
      caption: sex?.title || '',
    }));

  return sortBy(items, (i) => i.caption);
};
