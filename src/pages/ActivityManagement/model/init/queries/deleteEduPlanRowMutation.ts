import { mutation } from '@src/gql-client';

export const deleteEduPlanRowMutation = (id: string): string => {
  const resp = mutation.removeEduPlanRow({
    id,
  });
  const affectedRows = resp?.affectedRows ?? 0;
  return affectedRows > 0 ? id : '';
};
