import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { createStudentInfoInitialData, resetDomain } from '@src/pages/GroupManagement/model';

import { getCreateStudentInfoInitialDataQuery } from './queries';

connectGetActionNodes({
  nodes: createStudentInfoInitialData,
  handler: async (params) => resolved(() => getCreateStudentInfoInitialDataQuery(params), { noCache: true }),
  resetOn: [resetDomain],
});
