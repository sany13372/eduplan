import { mutation } from '@src/gql-client';

export const deleteScormMutation = (scormId: string): string => {
  return mutation.removeScormPackage({ scormPackageId: scormId }) ?? '';
};
