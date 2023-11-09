import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import {
  $eduGridElementList,
  getEduGridElementList,
  getEduGridElementListFx,
  resetDomainData,
} from '@src/pages/ActivityList/model';
import { getEduGridElementListQuery } from '@src/pages/ActivityList/model/init/queries';

forward({
  from: getEduGridElementList,
  to: getEduGridElementListFx,
});

getEduGridElementListFx.use(async ({ eduGridId, eduProgId, eduPlanId }) =>
  resolved(() => getEduGridElementListQuery(eduProgId, eduGridId, eduPlanId), { noCache: true }),
);

$eduGridElementList
  .on(getEduGridElementListFx.doneData, (_, res) => {
    return res;
  })
  .reset(resetDomainData);
