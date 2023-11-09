import { connectGetActionNodes } from '@utils/effector';
import { availableToLinkAdminsCount, linkAdmins, resetDomainData } from '@src/pages/EduPlans/model';
import { resolved } from '@src/gql-client';
import { getAvailableToLinkUsersCountQuery } from '@src/pages/EduPlans/model/init/queries';
import { sample } from 'effector';

connectGetActionNodes({
  nodes: availableToLinkAdminsCount,
  handler: async (planId) => resolved(() => getAvailableToLinkUsersCountQuery(planId), { noCache: true }),
  resetOn: [resetDomainData],
});

sample({
  clock: linkAdmins.addFx.done,
  fn: (clock) => clock.params.planId,
  target: availableToLinkAdminsCount.getFx,
});
