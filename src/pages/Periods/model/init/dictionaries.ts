import { resolved } from '@src/gql-client';
import { connectReferenceListNodes } from '@utils/effector';
import { periodKindsStore, resetDomain, resetSetPeriodInfo } from '@src/pages/Periods/model';
import { getPeriodKindsQuery } from '@src/pages/Periods/model/init/queries';

connectReferenceListNodes({
  nodes: periodKindsStore,
  handler: async () => resolved(() => getPeriodKindsQuery(), { noCache: true }),
  resetOn: [resetDomain, resetSetPeriodInfo],
});
