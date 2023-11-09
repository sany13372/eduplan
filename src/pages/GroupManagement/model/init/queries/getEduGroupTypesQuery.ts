import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { EduGroupType } from '@src/pages/GroupManagement/model/types';

export const getEduGroupTypesQuery = (eduPlanId: string): EduGroupType[] => {
  const items = query
    .readStudentGroupTypeSettings({
      where: {
        space: {
          eduPlans: { id: { _eq: eduPlanId } },
        },
        _or: [{ isDisabled: { _is_null: true } }, { isDisabled: { _eq: false } }],
      },
    })
    .map(castNotSkeleton)
    .map(({ itemId, studentGroupType }) => ({
      id: itemId || '',
      caption: studentGroupType?.title || '',
    }));

  return sortBy(items, (i) => i.caption);
};
