import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import {
  $filteredEduGridElementStore,
  $filters,
  eduGridElementStore,
  resetDomain,
} from '@src/pages/IotTemplateList/model';
import { sample } from 'effector';
import { defaultObj } from '@src/pages/IotTemplateList/model/constants';

import { getEduGridElementListQuery } from './queries';

connectGetActionNodes({
  nodes: eduGridElementStore,
  handler: async (eduPlanId) => resolved(() => getEduGridElementListQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

sample({
  source: eduGridElementStore.$value,
  clock: eduGridElementStore.$value,
  target: $filteredEduGridElementStore,
});

sample({
  source: eduGridElementStore.$value,
  clock: $filters,
  fn: (source, clock) => {
    const currentFilterVal = clock.gridElementList;
    if (currentFilterVal.find((e) => e.id === defaultObj.id)) return source;
    const idList = currentFilterVal.map((e) => e.id);
    return source.filter((e) => idList.includes(e.id));
  },
  target: $filteredEduGridElementStore,
});
$filteredEduGridElementStore.reset(resetDomain);
