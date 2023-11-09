import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { Sex } from '@src/pages/StudentManagement/model/types';

export const getCourseTypesQuery = (eduPlanId: string): Sex[] => {
  const items = query
    .readCourseSettings({
      where: {
        space: {
          eduPlans: { id: { _eq: eduPlanId } },
        },
        _or: [{ isDisabled: { _is_null: true } }, { isDisabled: { _eq: false } }],
      },
    })
    .map(castNotSkeleton)
    .map(({ itemId, course }) => ({
      id: itemId || '',
      caption: course?.title || '',
    }));

  return sortBy(items, (i) => i.caption);
};
