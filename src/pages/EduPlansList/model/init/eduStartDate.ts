import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { $eduStartDateList, getEduStartDateList, getEduStartDateListFx } from '@src/pages/EduPlansList/model';
import { getEduStartDateListQuery } from '@src/pages/EduPlansList/model/init/queries';
import { defaultEduStartDateList } from '@src/pages/EduPlansList/model/constants';
import { addErrorToast } from '@src/app/model';

forward({
  from: getEduStartDateList,
  to: getEduStartDateListFx,
});

getEduStartDateListFx.use(async (eduProgId) => resolved(() => getEduStartDateListQuery(eduProgId), { noCache: true }));
getEduStartDateListFx.fail.watch(() => addErrorToast({}));

$eduStartDateList.on(getEduStartDateListFx.doneData, (_, res) => [...defaultEduStartDateList, ...res]);
