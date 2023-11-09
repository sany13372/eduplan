import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { resetDomain } from '@src/pages/IotTemplateList/model';
import { groupList } from '@src/pages/IotManagement/model';
import { getGroupObjListQuery } from '@src/pages/IotManagement/model/init/queries';

connectGetActionNodes({
  nodes: groupList,
  handler: async (eduPlanId) => resolved(() => getGroupObjListQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});
