import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { admins, linkAdmins, resetDomainData } from '@src/pages/EduPlans/model';
import { getEduPlanAdminsCountQuery, getEduPlanAdminsQuery } from '@src/pages/EduPlans/model/init/queries';
import { sample } from 'effector';

connectGetActionNodes({
  nodes: admins,
  handler: async (planId) => {
    const adminsCount = await resolved(() => getEduPlanAdminsCountQuery(planId), { noCache: true });
    return resolved(() => getEduPlanAdminsQuery(planId, adminsCount), { noCache: true });
  },
  resetOn: [resetDomainData],
});

sample({
  clock: linkAdmins.addFx.done,
  fn: (clock) => clock.params.planId,
  target: admins.getFx,
});
