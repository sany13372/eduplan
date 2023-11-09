import {
  $createEduPlanInfo,
  getCreateEduPlanInfo,
  getCreateEduPlanInfoFx,
  resetCreateEduPlanInfo,
  createEduPlan,
  createEduPlanFx,
  $createdId,
  $createEduPlanValidationErrors,
  resetCreateEduPlanValidationErrors,
} from '@src/pages/EduPlans/model';
import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { createEduPlanMutation, getEmptyEduPlanQuery } from '@src/pages/EduPlans/model/init/queries';

import { convertCreateUpdateError } from '../validation';

forward({
  from: getCreateEduPlanInfo,
  to: getCreateEduPlanInfoFx,
});

getCreateEduPlanInfoFx.use(async (id) => {
  const resp = await resolved(() => getEmptyEduPlanQuery(id), { noCache: true });
  if (!resp) throw new Error('Не удалось получить информацию об учебном плане');
  return resp;
});

$createEduPlanInfo.on(getCreateEduPlanInfoFx.doneData, (_, val) => val).reset([resetCreateEduPlanInfo]);
forward({
  from: createEduPlan,
  to: createEduPlanFx,
});

createEduPlanFx.use(async (data) => {
  const resp = await resolved(() => createEduPlanMutation(data), { noCache: true });
  if (!resp) throw new Error('Не удалось получить информацию об учебном плане');
  return resp;
});

$createdId.on(createEduPlanFx.doneData, (_, val) => val).reset(resetCreateEduPlanInfo);

$createEduPlanValidationErrors
  .on(createEduPlanFx.doneData, () => ({}))
  .on(createEduPlanFx.failData, (_, e) => convertCreateUpdateError(e))
  .reset([resetCreateEduPlanInfo, resetCreateEduPlanValidationErrors]);
