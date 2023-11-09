import { mutation } from '@src/gql-client';

export const deleteGroupMutation = (groupId: string): string => {
  const resp = mutation.removeStudentGroupV2({ id: groupId });
  return resp ?? '';
};
