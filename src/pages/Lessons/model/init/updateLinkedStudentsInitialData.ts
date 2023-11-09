import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { resetDomain, updateLinkedStudentsInitialData } from '@src/pages/Lessons/model';

import { getLinkedStudentsIdListQuery } from './queries';

connectGetActionNodes<string, string[]>({
  nodes: updateLinkedStudentsInitialData,
  handler: async (implId) => resolved(() => getLinkedStudentsIdListQuery(implId), { noCache: true }),
  resetOn: [resetDomain],
});
