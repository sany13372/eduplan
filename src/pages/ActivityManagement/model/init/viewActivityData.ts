import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { activityInfo, resetDomainData } from '@src/pages/ActivityManagement/model';

import { getActivityInfoQuery } from './queries';

connectGetActionNodes({
  nodes: activityInfo,
  handler: async (activityId) => resolved(() => getActivityInfoQuery(activityId), { noCache: true }),
  resetOn: [resetDomainData],
});
