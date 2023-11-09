import { mutation } from '@src/gql-client';
import { ShortActivityInfo } from '@src/pages/ActivityManagement/model/types';

export const updateActivityMutation = ({ id, title, shortTitle }: ShortActivityInfo): string => {
  const resp = mutation.setEduPlanActivity({
    id,
    eduPlanActivity: {
      title,
      shortTitle,
    },
  });

  return resp?.id ?? '';
};
