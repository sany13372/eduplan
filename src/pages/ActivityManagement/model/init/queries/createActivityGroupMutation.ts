import { mutation } from '@src/gql-client';
import { ShortActivityGroupInfo } from '@src/pages/ActivityManagement/model/types';

export const createActivityGroupMutation = ({
  eduPlanId,
  title,
  shortTitle,
  eduGridElementId,
  component,
}: ShortActivityGroupInfo): string => {
  const resp = mutation.addEduPlanActivityGroup({
    eduPlanActivityGroup: {
      eduPlan: {
        id: eduPlanId,
      },
      title,
      shortTitle,
      componentKindId: component ? (component.id as string) : '',
      eduGridElementId,
    },
  });

  return resp?.id ?? '';
};
