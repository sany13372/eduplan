import { query } from '@src/gql-client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getEduProgramIdQuery = (eduPlanId: string): string => {
  const resp = query.readEduPlan({
    id: eduPlanId,
  });

  return resp?.eduProgramId ?? '';
};
