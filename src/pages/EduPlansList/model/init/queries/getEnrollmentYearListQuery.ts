import { order_by, query } from '@src/gql-client';
import { castNotSkeleton } from 'gqty';
import { EnrollmentYear } from '@src/pages/EduPlansList/model/types';
import isNil from 'lodash/isNil';

const eduProgIdCriteria = (eduProgId?: string) =>
  eduProgId
    ? {
        space: {
          eduPrograms: {
            id: {
              _eq: eduProgId,
            },
          },
        },
      }
    : {};
export const getEnrollmentYearListQuery = (eduProgId?: string): EnrollmentYear[] => {
  const resp = query
    .readEduPlans({
      where: {
        deletedAt: { _is_null: true },
        ...eduProgIdCriteria(eduProgId),
      },
      order_by: [{ title: order_by.asc }],
    })
    .map((e) => castNotSkeleton(e));

  const yearList = resp.map((e) => e.enrollmentYear).filter((e) => !isNil(e)) as number[];
  const yearListUniq = Array.from(new Set(yearList)).sort((a, b) => (a > b ? 1 : -1));
  return yearListUniq.map((e) => ({
    id: e,
    caption: e.toString(10),
  }));
};
