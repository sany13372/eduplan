import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import {
  $academicHourDurationList,
  getAcademicHourDurationList,
  getAcademicHourDurationListFx,
} from '@src/pages/EduPlans/model';
import { getAcademicHourDurationListQuery } from '@src/pages/EduPlans/model/init/queries';
import { addErrorToast } from '@src/app/model';

forward({
  from: getAcademicHourDurationList,
  to: getAcademicHourDurationListFx,
});

getAcademicHourDurationListFx.use(async (eduProgId) =>
  resolved(() => getAcademicHourDurationListQuery(eduProgId), { noCache: true }),
);
getAcademicHourDurationListFx.fail.watch(() => addErrorToast({}));

$academicHourDurationList.on(getAcademicHourDurationListFx.doneData, (_, res) => res);
