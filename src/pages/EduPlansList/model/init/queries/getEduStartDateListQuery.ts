import { order_by, query } from '@src/gql-client';
import { castNotSkeleton } from 'gqty';
import { EduStartDate } from '@src/pages/EduPlansList/model/types';
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

export const getEduStartDateListQuery = (eduProgId?: string): EduStartDate[] => {
  const resp = query
    .readEduPlans({
      where: {
        deletedAt: { _is_null: true },
        ...eduProgIdCriteria(eduProgId),
      },
      order_by: [{ title: order_by.asc }],
    })
    .map((e) => castNotSkeleton(e));
  const startDateList = resp.map((e) => e.eduStartDate).filter((e) => !isNil(e));
  const startDateUniq = Array.from(new Set(startDateList)).sort((a, b) => (a > b ? 1 : -1));
  return startDateUniq.map((e) => {
    const startDate = new Date(e);
    return {
      id: startDate.getTime(),
      caption: startDate.toLocaleDateString('ru'),
    };
  });
};
