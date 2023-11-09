import { mutation } from '@src/gql-client';

export const setAdminsMutation = (data: { checkedUsers: string[]; planId: string }): string => {
  const resp = mutation.setEduPlanAdmins({
    admins: data.checkedUsers,
    planId: data.planId,
  });

  return resp?.length.toString() ?? '';
};
