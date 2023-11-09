import { mutation } from '@src/gql-client';

export const deleteEduPlanRowMutation = (id: string): boolean => {
  const resp = mutation.removeEduPlanRow({
    id,
  });
  if (!resp) return false;
  const affectedRows = resp?.affectedRows ?? 0;
  return affectedRows > 0;
};
