import { mutation } from '@src/gql-client';

export const deleteIotTemplateMutation = (id: string): string | null => {
  const resp = mutation.removeEduTrajectoryTemplate({
    id,
  });

  return resp ?? null;
};
