import { resolved } from '@src/gql-client';
import { getStudentsWithoutGroupQuery } from '@src/pages/StudentGroupList/model/init/queries';
import { connectGetActionNodes } from '@utils/effector';
import { groupStudentModalApi, resetDomain, studentsWithoutGroup } from '@src/pages/StudentGroupList/model';

connectGetActionNodes({
  nodes: studentsWithoutGroup,
  handler: async (eduPlanId) => resolved(() => getStudentsWithoutGroupQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain, groupStudentModalApi.close],
});
