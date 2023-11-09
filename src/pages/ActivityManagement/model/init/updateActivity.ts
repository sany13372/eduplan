import { forward } from 'effector';
import {
  $getUpdatedItemStatus,
  $updateActivityErrors,
  $updatedId,
  $updatedItem,
  $updatedItemNotFound,
  createActivityFx,
  getUpdatedItem,
  getUpdatedItemFx,
  resetUpdateActivityErrors,
  resetUpdateActivityInfo,
  updateActivity,
  updateActivityFx,
} from '@src/pages/ActivityManagement/model';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import { updateActivityMutation, getEduPlanRowActivityQuery } from '@src/pages/ActivityManagement/model/init/queries';
import { convertCreateUpdateActivityError } from '@src/pages/ActivityManagement/model/validation';

forward({
  from: getUpdatedItem,
  to: getUpdatedItemFx,
});
getUpdatedItemFx.use(async (id) => resolved(() => getEduPlanRowActivityQuery(id), { noCache: true }));
$updatedItemNotFound.on(getUpdatedItemFx.doneData, (state, val) => !val).reset(resetUpdateActivityInfo);
$updatedItem.on(getUpdatedItemFx.doneData, (_, val) => val).reset(resetUpdateActivityInfo);
$getUpdatedItemStatus.reset(resetUpdateActivityInfo);

forward({
  from: updateActivity,
  to: updateActivityFx,
});

updateActivityFx.use(async (params) => resolved(() => updateActivityMutation(params), { noCache: true }));

const updateActivityFailed = createActivityFx.failData.map((e) => convertCreateUpdateActivityError(e));

updateActivityFailed.watch((validationError) => {
  if (!validationError) {
    addErrorToast({});
  }
});

$updateActivityErrors
  .on(updateActivityFx.failData, (_, e) => convertCreateUpdateActivityError(e))
  .reset([resetUpdateActivityInfo, resetUpdateActivityErrors]);

$updatedId.on(updateActivityFx.doneData, (_, val) => val).reset([resetUpdateActivityErrors, resetUpdateActivityInfo]);
