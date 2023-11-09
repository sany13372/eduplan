import { mutation } from '@src/gql-client';
import { AddStudentType } from '@src/pages/GroupManagement/model/types';

export const addStudentsToGroupQuery = ({ groupId, studentIds }: AddStudentType): string => {
  const res = mutation.addStudentsToGroup({
    input: {
      groupId,
      studentIds,
    },
  });

  return res ? 'ok' : '';
};
