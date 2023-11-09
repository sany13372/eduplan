import { mutation } from '@src/gql-client';
import { UpdateGroupInfo } from '@src/pages/GroupManagement/model/types';

export const updateGroupMutation = ({ title, id }: UpdateGroupInfo): string => {
  const resp = mutation.updateStudentGroup({
    pk_columns: { id },
    _set: {
      title: title.trim(),
    },
  });

  return resp?.id ?? '';
};
