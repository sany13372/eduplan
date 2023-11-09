import { mutation } from '@src/gql-client';
import { ShortActivityInfo } from '@src/pages/ActivityManagement/model/types';

export const createActivityMutation = ({
  eduPlanId,
  title,
  shortTitle,
  category,
  eduGridElementId,
  path,
}: ShortActivityInfo): string => {
  const resp = mutation.addEduPlanActivity({
    eduPlanActivity: {
      eduPlan: {
        id: eduPlanId,
      },
      title,
      shortTitle,
      categoryId: category ? (category.id as string) : '',
      eduGridElementId,
      path: path ?? '',
    },
  });

  return resp?.id ?? '';
};
