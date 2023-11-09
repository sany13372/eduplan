import { forward } from 'effector';
import {
  $createActivityErrors,
  $createdId,
  createActivity,
  createActivityFx,
  resetCreateActivityErrors,
  resetCreateActivityInfo,
} from '@src/pages/ActivityManagement/model';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import { createActivityMutation } from '@src/pages/ActivityManagement/model/init/queries';
import { convertCreateUpdateActivityError } from '@src/pages/ActivityManagement/model/validation';

forward({
  from: createActivity,
  to: createActivityFx,
});

createActivityFx.use(async (params) => resolved(() => createActivityMutation(params), { noCache: true }));

const createActivityFailed = createActivityFx.failData.map((e) => convertCreateUpdateActivityError(e));

createActivityFailed.watch((validationError) => {
  if (!validationError) {
    addErrorToast({});
  }
});

$createActivityErrors
  .on(createActivityFx.failData, (_, e) => convertCreateUpdateActivityError(e))
  .reset([resetCreateActivityInfo, resetCreateActivityErrors]);

$createdId.on(createActivityFx.doneData, (_, val) => val).reset([resetCreateActivityErrors, resetCreateActivityInfo]);
