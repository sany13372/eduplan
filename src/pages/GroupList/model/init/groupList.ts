import { $groupListInfo, deleteGroup, getGroupList, getGroupListFx, resetDomain } from '@src/pages/GroupList/model';
import { forward, sample } from 'effector';
import { addErrorToast } from '@src/app/model';
import { resolved } from '@src/gql-client';
import { getEduGroupListQuery } from '@src/pages/GroupList/model/init/queries';

forward({
  from: getGroupList,
  to: getGroupListFx,
});

getGroupListFx.use(async (params) => resolved(() => getEduGroupListQuery(params), { noCache: true }));

sample({
  clock: getGroupListFx.fail,
  fn: () => ({}),
  target: addErrorToast,
});

$groupListInfo
  .on(getGroupListFx.doneData, (_, value) => value)
  .on(deleteGroup.deleteFx.doneData, ({ totalItemCount, items }) => ({
    totalItemCount: totalItemCount - 1,
    items,
  }))
  .reset(resetDomain);
