import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { createGroupInitialData, resetDomain } from '@src/pages/StudentGroupList/model';

import { getCreateGroupInitialDataQuery } from './queries';

connectGetActionNodes({
  nodes: createGroupInitialData,
  handler: async (eduPlanId) => resolved(() => getCreateGroupInitialDataQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});
