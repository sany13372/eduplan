import { query } from '@src/gql-client';

export const getAvailableToLinkUsersCountQuery = (planId: string): number => {
  const resp = query.getAvailableEduProgramAdmins({
    planId,
  });
  return resp?.count ?? 0;
};
