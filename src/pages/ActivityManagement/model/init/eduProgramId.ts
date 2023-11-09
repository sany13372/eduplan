import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import {
  $eduProgramId,
  getEduProgramId,
  getEduProgramIdFx,
  resetDomainData,
} from '@src/pages/ActivityManagement/model';
import { getEduProgramIdQuery } from '@src/pages/ActivityManagement/model/init/queries';

forward({
  from: getEduProgramId,
  to: getEduProgramIdFx,
});

getEduProgramIdFx.use(async (eduPlanId) => {
  const resp = resolved(() => getEduProgramIdQuery(eduPlanId), { noCache: true });
  if (!resp) throw new Error('Не удалось получить id образовательной программы');
  return resp;
});

$eduProgramId.on(getEduProgramIdFx.doneData, (_, res) => res).reset(resetDomainData);
