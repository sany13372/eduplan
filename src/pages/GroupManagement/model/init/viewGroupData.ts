import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { $pageParams, eduGroupInfo, resetDomain, updateGroup } from '@src/pages/GroupManagement/model';
import { sample } from 'effector';

import { getViewGroupDataQuery } from './queries';

connectGetActionNodes({
  nodes: eduGroupInfo,
  handler: async (groupId) => resolved(() => getViewGroupDataQuery(groupId), { noCache: true }),
  resetOn: [resetDomain],
});

sample({
  clock: updateGroup.updateFx.doneData,
  source: $pageParams,
  fn: (pageParams) => pageParams.groupId,
  target: eduGroupInfo.get,
});
