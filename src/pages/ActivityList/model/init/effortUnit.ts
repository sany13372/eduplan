import { resolved } from '@src/gql-client';
import { effortUnitStore, resetDomainData } from '@src/pages/ActivityList/model';
import { connectGetActionNodes } from '@utils/effector';

import { getEffortUnitSettingsQuery } from './queries';

connectGetActionNodes({
  nodes: effortUnitStore,
  handler: async (activityId) => resolved(() => getEffortUnitSettingsQuery(activityId), { noCache: true }),
  resetOn: [resetDomainData],
});
