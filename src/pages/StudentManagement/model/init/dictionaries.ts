import { resolved } from '@src/gql-client';
import { connectReferenceListNodes } from '@utils/effector';
import {
  courseStore,
  financingSourceStore,
  groupsStore,
  resetDomain,
  sexStore,
} from '@src/pages/StudentManagement/model';

import { getSexTypesQuery, getCourseTypesQuery, getFinancingSourceTypesQuery, getEduGroupListQuery } from './queries';

connectReferenceListNodes({
  nodes: sexStore,
  handler: async (eduPlanId) => resolved(() => getSexTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

connectReferenceListNodes({
  nodes: courseStore,
  handler: async (eduPlanId) => resolved(() => getCourseTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

connectReferenceListNodes({
  nodes: financingSourceStore,
  handler: async (eduPlanId) => resolved(() => getFinancingSourceTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

connectReferenceListNodes({
  nodes: groupsStore,
  handler: async (eduPlanId) => resolved(() => getEduGroupListQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});
