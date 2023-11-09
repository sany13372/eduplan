import { resolved } from '@src/gql-client';
import { connectReferenceListNodes } from '@utils/effector';
import {
  groupTypesStore,
  resetDomain,
  courseStore,
  financingSourceStore,
  groupsStore,
  sexStore,
  resetStudentModal,
} from '@src/pages/GroupManagement/model';

import {
  getEduGroupTypesQuery,
  getSexTypesQuery,
  getCourseTypesQuery,
  getEduGroupListQuery,
  getFinancingSourceTypesQuery,
} from './queries';

connectReferenceListNodes({
  nodes: groupTypesStore,
  handler: async (eduPlanId) => resolved(() => getEduGroupTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

connectReferenceListNodes({
  nodes: sexStore,
  handler: async (eduPlanId) => resolved(() => getSexTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetStudentModal],
});

connectReferenceListNodes({
  nodes: courseStore,
  handler: async (eduPlanId) => resolved(() => getCourseTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetStudentModal],
});

connectReferenceListNodes({
  nodes: financingSourceStore,
  handler: async (eduPlanId) => resolved(() => getFinancingSourceTypesQuery(eduPlanId), { noCache: true }),
  resetOn: [resetStudentModal],
});

connectReferenceListNodes({
  nodes: groupsStore,
  handler: async (eduPlanId) => resolved(() => getEduGroupListQuery(eduPlanId), { noCache: true }),
  resetOn: [resetStudentModal],
});
