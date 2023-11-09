import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { $enrollmentYearList, getEnrollmentYearList, getEnrollmentYearListFx } from '@src/pages/EduPlansList/model';
import { getEnrollmentYearListQuery } from '@src/pages/EduPlansList/model/init/queries';
import { defaultEnrollmentYearList } from '@src/pages/EduPlansList/model/constants';
import { addErrorToast } from '@src/app/model';

forward({
  from: getEnrollmentYearList,
  to: getEnrollmentYearListFx,
});

getEnrollmentYearListFx.use(async (eduProgId) =>
  resolved(() => getEnrollmentYearListQuery(eduProgId), { noCache: true }),
);
getEnrollmentYearListFx.fail.watch(() => addErrorToast({}));
$enrollmentYearList.on(getEnrollmentYearListFx.doneData, (_, res) => [...defaultEnrollmentYearList, ...res]);
