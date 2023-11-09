import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { $eduFormList, getEduFormList, getEduFormListFx } from '@src/pages/EduPlansList/model';
import { getEduFormListQuery } from '@src/pages/EduPlansList/model/init/queries';
import { addErrorToast } from '@src/app/model';

forward({
  from: getEduFormList,
  to: getEduFormListFx,
});

getEduFormListFx.use(async (eduProgId) => resolved(() => getEduFormListQuery(eduProgId), { noCache: true }));
getEduFormListFx.fail.watch(() => addErrorToast({}));

$eduFormList.on(getEduFormListFx.doneData, (_, res) => res);
