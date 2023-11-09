import {
  $eduPlanInfo,
  $eduPlanNotFound,
  getEduPlanInfo,
  getEduPlanInfoFx,
  resetEduPlanInfo,
} from '@src/pages/EduPlans/model';
import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { getEduPlanQuery } from '@src/pages/EduPlans/model/init/queries';

forward({
  from: getEduPlanInfo,
  to: getEduPlanInfoFx,
});

getEduPlanInfoFx.use(async (id) => {
  const resp = await resolved(() => getEduPlanQuery(id), { noCache: true });
  // if (!resp) throw new Error('Не удалось получить информацию об учебном плане');
  return resp;
});

$eduPlanInfo.on(getEduPlanInfoFx.doneData, (state, val) => val || state).reset([resetEduPlanInfo]);
$eduPlanNotFound.on(getEduPlanInfoFx.doneData, (_, val) => !val).reset([resetEduPlanInfo]);
