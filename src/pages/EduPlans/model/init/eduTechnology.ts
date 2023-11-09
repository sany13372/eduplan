import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { $eduTechnologyList, getEduTechnologyList, getEduTechnologyListFx } from '@src/pages/EduPlans/model';
import { getEduTechnologyListQuery } from '@src/pages/EduPlans/model/init/queries';
import { addErrorToast } from '@src/app/model';

forward({
  from: getEduTechnologyList,
  to: getEduTechnologyListFx,
});

getEduTechnologyListFx.use(async (eduProgId: string) =>
  resolved(() => getEduTechnologyListQuery(eduProgId), { noCache: true }),
);
getEduTechnologyListFx.fail.watch(() => addErrorToast({}));

$eduTechnologyList.on(getEduTechnologyListFx.doneData, (_, res) => res);
