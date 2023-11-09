import {
  $updateEduPlanInfo,
  getUpdateEduPlanInfo,
  getUpdateEduPlanInfoFx,
  resetUpdateEduPlanInfo,
  updateEduPlan,
  updateEduPlanFx,
  $updatedId,
  $updateEduPlanValidationErrors,
  resetUpdateEduPlanValidationErrors,
  $updateEduPlanInfoNotFound,
} from '@src/pages/EduPlans/model';
import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { updateEduPlanMutation, getEduPlanQuery } from '@src/pages/EduPlans/model/init/queries';
import { localDateToServerDateString } from '@utils/date';

import { convertCreateUpdateError } from '../validation';

forward({
  from: getUpdateEduPlanInfo,
  to: getUpdateEduPlanInfoFx,
});

getUpdateEduPlanInfoFx.use(async (id) => {
  const resp = await resolved(() => getEduPlanQuery(id), { noCache: true });
  return resp;
});

$updateEduPlanInfo.on(getUpdateEduPlanInfoFx.doneData, (state, val) => val || state).reset([resetUpdateEduPlanInfo]);
$updateEduPlanInfoNotFound.on(getUpdateEduPlanInfoFx.doneData, (state, val) => !val).reset([resetUpdateEduPlanInfo]);

forward({
  from: updateEduPlan,
  to: updateEduPlanFx,
});

updateEduPlanFx.use(async (data) => {
  const resp = await resolved(() => updateEduPlanMutation(data), { noCache: true });

  if (!resp) throw new Error('Не удалось получить информацию об учебном плане');
  return resp;
});

$updatedId.on(updateEduPlanFx.doneData, (_, val) => val).reset(resetUpdateEduPlanInfo);

$updateEduPlanValidationErrors
  .on(updateEduPlanFx.doneData, () => ({}))
  .on(updateEduPlanFx.failData, (_, e) => convertCreateUpdateError(e))
  .reset([resetUpdateEduPlanInfo, resetUpdateEduPlanValidationErrors]);
