import { mutation } from '@src/gql-client';

export const deleteStudentMutation = (studentId: string): string => {
  return mutation.removeStudent({ id: studentId })?.id ?? '';
};
