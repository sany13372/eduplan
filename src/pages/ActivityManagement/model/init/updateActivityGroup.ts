import { forward } from 'effector';
import {
  $getUpdatedGroupItemStatus,
  $updatedGroupId,
  $updatedGroupItem,
  $updatedGroupItemNotFound,
  $updateGroupActivityErrors,
  createActivityFx,
  getUpdatedGroupItem,
  getUpdatedGroupItemFx,
  getUpdatedItemFx,
  resetUpdateGroupActivityErrors,
  resetUpdateGroupActivityInfo,
  updateGroupActivity,
  updateGroupActivityFx,
} from '@src/pages/ActivityManagement/model';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import {
  getEduPlanRowActivityGroupQuery,
  updateActivityGroupMutation,
} from '@src/pages/ActivityManagement/model/init/queries';
import { convertCreateUpdateActivityGroupError } from '@src/pages/ActivityManagement/model/validation';

forward({
  from: getUpdatedGroupItem,
  to: getUpdatedGroupItemFx,
});
getUpdatedGroupItemFx.use(async (id) => resolved(() => getEduPlanRowActivityGroupQuery(id), { noCache: true }));
$updatedGroupItemNotFound.on(getUpdatedItemFx.doneData, (state, val) => !val).reset(resetUpdateGroupActivityInfo);
$updatedGroupItem.on(getUpdatedGroupItemFx.doneData, (_, val) => val).reset(resetUpdateGroupActivityInfo);
$getUpdatedGroupItemStatus.reset(resetUpdateGroupActivityInfo);

forward({
  from: updateGroupActivity,
  to: updateGroupActivityFx,
});

updateGroupActivityFx.use(async (params) => resolved(() => updateActivityGroupMutation(params), { noCache: true }));

const updateGroupActivityFailed = createActivityFx.failData.map((e) => convertCreateUpdateActivityGroupError(e));

updateGroupActivityFailed.watch((validationError) => {
  if (!validationError) {
    addErrorToast({});
  }
});

$updateGroupActivityErrors
  .on(updateGroupActivityFx.failData, (_, e) => convertCreateUpdateActivityGroupError(e))
  .reset([resetUpdateGroupActivityInfo, resetUpdateGroupActivityErrors]);

$updatedGroupId.on(updateGroupActivityFx.doneData, (_, val) => val).reset([resetUpdateGroupActivityInfo]);
