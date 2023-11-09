import { mutation } from '@src/gql-client';

export const deletePeriodMutation = (id: string): string => {
  const resp = mutation.removeEduPlanGridElementPeriod({ id });
  return resp ?? '';
};
