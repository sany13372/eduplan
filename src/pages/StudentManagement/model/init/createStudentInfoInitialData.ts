import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { createStudentInfoInitialData, resetDomain } from '@src/pages/StudentManagement/model';

import { getCreateStudentInfoInitialDataQuery } from './queries';

connectGetActionNodes({
  nodes: createStudentInfoInitialData,
  handler: async (eduPlanId) => resolved(() => getCreateStudentInfoInitialDataQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});
