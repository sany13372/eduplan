import { mutation } from '@src/gql-client';
import { ShortActivityGroupInfo } from '@src/pages/ActivityManagement/model/types';

export const updateActivityGroupMutation = ({ id, title, shortTitle }: ShortActivityGroupInfo): string => {
  const resp = mutation.setEduPlanActivityGroup({
    id,
    eduPlanActivityGroup: {
      title,
      shortTitle,
    },
  });

  return resp?.id ?? '';
};
