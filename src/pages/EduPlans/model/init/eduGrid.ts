import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { $eduGridList, getEduGridList, getEduGridListFx } from '@src/pages/EduPlans/model';
import { getEduGridListQuery } from '@src/pages/EduPlans/model/init/queries';
import { addErrorToast } from '@src/app/model';

forward({
  from: getEduGridList,
  to: getEduGridListFx,
});

getEduGridListFx.use(async (eduProgId) => resolved(() => getEduGridListQuery(eduProgId), { noCache: true }));
getEduGridListFx.fail.watch(() => addErrorToast({}));

$eduGridList.on(getEduGridListFx.doneData, (_, res) => {
  return res;
});
