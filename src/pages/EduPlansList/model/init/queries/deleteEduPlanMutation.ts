import { mutation } from '@src/gql-client';

export const deleteEduPlanMutation = (eduPlanId: string): string => {
  const resp = mutation.removeEduPlan({
    id: eduPlanId,
  });
  return resp?.id ?? '';
};
