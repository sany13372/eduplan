import { mutation } from '@src/gql-client';
import { CreateGroupInfo } from '@src/pages/StudentGroupList/model/types';

export const createGroupMutation = ({ spaceId, groupType, title, eduPlanId }: CreateGroupInfo): string => {
  const resp = mutation.addStudentGroupV2({
    studentGroupDTO: {
      spaceId,
      eduPlanId,
      title: title.trim(),
      groupTypeId: groupType?.id ?? '',
    },
  });

  return resp?.id ?? '';
};
