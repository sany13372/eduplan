import { mutation } from '@src/gql-client';

export const excludeStudentFromGroupQuery = (studentIds: string[]) => {
  mutation.removeStudentsFromGroup({
    studentIds,
  });
  return studentIds[0];
};
