import { resolved } from '@src/gql-client';
import { connectReferenceListNodes } from '@utils/effector';
import { groupTypesStore, resetDomain, groupsStore } from '@src/pages/StudentGroupList/model';
import { getEduGroupListQuery, getEduGroupTypesQuery } from '@src/pages/StudentGroupList/model/init/queries';

connectReferenceListNodes({
  nodes: groupTypesStore,
  handler: async (eduPlanId) => resolved(() => getEduGroupTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

connectReferenceListNodes({
  nodes: groupsStore,
  handler: async (eduPlanId) => resolved(() => getEduGroupListQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});
