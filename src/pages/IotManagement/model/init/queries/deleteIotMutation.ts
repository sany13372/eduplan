import { mutation } from '@src/gql-client';

export const deleteIotMutation = (id: string): string | null => {
  const resp = mutation.removeStudentTrajectory({
    id,
  });

  return resp ?? null;
};
