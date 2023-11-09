import { sample } from 'effector';
import { getEduGroupsInfoQuery } from '@src/pages/StudentGroupList/model/init/queries';
import {
  getStudentsListFx,
  getEduPlanGroupFx,
  setEduPlanId,
  $eduPlanGroups,
  deleteGroup,
  updateGroup,
  addGroup,
} from '@src/pages/StudentGroupList/model';
import { resolved } from '@src/gql-client';
import { emptyGroup } from '@src/pages/StudentGroupList/model/constants';
import { orderBy } from 'lodash';

getEduPlanGroupFx.use(async (eduPlanId) => {
  const resp = await resolved(() => getEduGroupsInfoQuery(eduPlanId), { noCache: true });
  return [emptyGroup, ...orderBy(resp, ['caption'], ['asc'])];
});

sample({
  clock: setEduPlanId,
  filter: (id) => id !== '',
  target: [getStudentsListFx, getEduPlanGroupFx],
});

sample({
  clock: getEduPlanGroupFx.doneData,
  target: $eduPlanGroups,
});

sample({
  clock: [deleteGroup.deleteFx.done, updateGroup.updateFx.doneData, addGroup.addFx.doneData],
  source: setEduPlanId,
  filter: (id) => id !== '',
  target: getEduPlanGroupFx,
});
