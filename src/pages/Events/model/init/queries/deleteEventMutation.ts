import { mutation } from '@src/gql-client';

export const deleteEventMutation = (id: string) => {
  const resp = mutation.removeEduPlanWebinar({
    id,
  });
  return Boolean(resp?.id);
};
