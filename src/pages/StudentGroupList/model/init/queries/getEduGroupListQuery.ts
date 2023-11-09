import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { EduGroup } from '@src/pages/StudentManagement/model/types';

export const getEduGroupListQuery = (eduPlanId: string): EduGroup[] => {
  const items = query
    .readStudentGroups({
      where: {
        eduPlanId: { _eq: eduPlanId },
        deletedAt: { _is_null: true },
      },
    })
    .map(castNotSkeleton)
    .map(({ id, title }) => ({
      id,
      caption: title ?? '',
    }));

  return sortBy(items, (i) => i.caption);
};
