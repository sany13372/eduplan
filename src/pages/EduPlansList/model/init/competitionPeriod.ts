import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import {
  $competitionPeriodList,
  getCompetitionPeriodList,
  getCompetitionPeriodListFx,
} from '@src/pages/EduPlansList/model';
import { getCompetitionPeriodListQuery } from '@src/pages/EduPlansList/model/init/queries';
import { addErrorToast } from '@src/app/model';

forward({
  from: getCompetitionPeriodList,
  to: getCompetitionPeriodListFx,
});

getCompetitionPeriodListFx.use(async (eduProgId) =>
  resolved(() => getCompetitionPeriodListQuery(eduProgId), { noCache: true }),
);
getCompetitionPeriodListFx.fail.watch(() => addErrorToast({}));

$competitionPeriodList.on(getCompetitionPeriodListFx.doneData, (_, res) => res);
