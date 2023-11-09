import { connectGetActionNodes } from '@utils/effector';
import { eduPlanDesc, resetDomainData } from '@src/pages/Desc/model';
import { resolved } from '@src/gql-client';
import { getDescQuery } from '@src/pages/Desc/model/init/queries';

connectGetActionNodes({
  nodes: eduPlanDesc,
  handler: async (eduplanId: string) => resolved(() => getDescQuery(eduplanId), { noCache: true }),
  resetOn: [resetDomainData],
});
