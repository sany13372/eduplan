import { query } from '@src/gql-client';

export const getEduPlanAdminsCountQuery = (planId: string): number => {
  const resp = query.getEduProgramAdmins({
    planId,
  });
  return resp?.count ?? 0;
};
