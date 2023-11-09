import { mutation } from '@src/gql-client';
import { AddStudentType } from '@src/pages/StudentGroupList/model/types';

export const addStudentsToGroupQuery = ({ groupId, studentIds }: AddStudentType) => {
  const res = mutation.addStudentsToGroup({
    input: {
      groupId,
      studentIds,
    },
  });

  return res;
};
