import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { resetDomain, updateGroupInitialData } from '@src/pages/StudentGroupList/model';

import { getUpdateGroupInitialDataQuery } from './queries';

connectGetActionNodes({
  nodes: updateGroupInitialData,
  handler: async (groupId) => resolved(() => getUpdateGroupInitialDataQuery(groupId), { noCache: true }),
  resetOn: [resetDomain],
});
