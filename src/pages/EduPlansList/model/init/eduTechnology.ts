import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { $eduTechnologyList, getEduTechnologyList, getEduTechnologyListFx } from '@src/pages/EduPlansList/model';
import { getEduTechnologyListQuery } from '@src/pages/EduPlansList/model/init/queries';
import { addErrorToast } from '@src/app/model';

forward({
  from: getEduTechnologyList,
  to: getEduTechnologyListFx,
});

getEduTechnologyListFx.use(async (eduProgId) =>
  resolved(() => getEduTechnologyListQuery(eduProgId), { noCache: true }),
);
getEduTechnologyListFx.fail.watch(() => addErrorToast({}));

$eduTechnologyList.on(getEduTechnologyListFx.doneData, (_, res) => res);
