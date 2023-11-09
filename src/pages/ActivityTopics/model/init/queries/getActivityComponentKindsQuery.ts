import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { Reference } from '@src/pages/ActivityTopics/model/types';

export const getActivityComponentKindsQuery = (spaceId: string): Reference[] => {
  const items = query
    .readEduPlanActivityComponentKindSettings({
      where: {
        spaceId: { _eq: spaceId },
        _or: [{ isDisabled: { _is_null: true } }, { isDisabled: { _eq: false } }],
      },
    })
    .map(castNotSkeleton)
    .filter(({ eduPlanActivityComponentKind }) => !!eduPlanActivityComponentKind)
    .map(({ itemId, eduPlanActivityComponentKind }) => ({
      id: itemId || '',
      caption: eduPlanActivityComponentKind?.title || '',
    }));

  return sortBy(items, (i) => i.caption);
};
