import { query } from '@src/gql-client';

export const getEduPlanIsAvailableQuery = (id: string): string | null | undefined => {
  const resp = query.readEduPlan({
    id,
  });
  return resp?.deletedAt;
};
