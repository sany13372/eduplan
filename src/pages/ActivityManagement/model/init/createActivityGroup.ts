import { forward } from 'effector';
import {
  $createdGroupId,
  $createGroupActivityErrors,
  createActivityFx,
  createGroupActivity,
  createGroupActivityFx,
  resetCreateGroupActivityErrors,
  resetCreateGroupActivityInfo,
} from '@src/pages/ActivityManagement/model';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import { createActivityGroupMutation } from '@src/pages/ActivityManagement/model/init/queries';
import { convertCreateUpdateActivityGroupError } from '@src/pages/ActivityManagement/model/validation';

forward({
  from: createGroupActivity,
  to: createGroupActivityFx,
});

createGroupActivityFx.use(async (params) => resolved(() => createActivityGroupMutation(params), { noCache: true }));

const createGroupActivityFailed = createActivityFx.failData.map((e) => convertCreateUpdateActivityGroupError(e));

createGroupActivityFailed.watch((validationError) => {
  if (!validationError) {
    addErrorToast({});
  }
});

$createGroupActivityErrors
  .on(createGroupActivityFx.failData, (_, e) => convertCreateUpdateActivityGroupError(e))
  .reset([resetCreateGroupActivityInfo, resetCreateGroupActivityErrors]);

$createdGroupId
  .on(createGroupActivityFx.doneData, (_, val) => val)
  .reset([resetCreateGroupActivityInfo, resetCreateGroupActivityInfo]);
