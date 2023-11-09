import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import {
  $eduGridElementsFilter,
  $filteredEduGridElements,
  eduGridElements,
  resetDomain,
  resetEduGridElementsFilter,
  setGridElementsFilter,
} from '@src/pages/IotManagement/model';
import { getEduGridElementListQuery, getEduGridIotTemplatesQuery } from '@src/pages/IotManagement/model/init/queries';
import { GridElementTemplateCount } from '@src/pages/IotManagement/model/types';
import { defauleEduGridElementItem } from '@src/pages/IotManagement/model/constants';
import { sample } from 'effector';

connectGetActionNodes({
  nodes: eduGridElements,
  handler: async (eduPlanId) => {
    const items = await resolved(() => getEduGridElementListQuery(eduPlanId), { noCache: true });
    const templateCount: GridElementTemplateCount = await resolved(() => getEduGridIotTemplatesQuery(eduPlanId), {
      noCache: true,
    });
    return items.map((el) => ({ ...el, iotTemplateCount: templateCount[el.id] ?? 0 }));
  },
  resetOn: [resetDomain],
});

$eduGridElementsFilter
  .on(setGridElementsFilter, (state, list) => {
    const filteredVals = list.filter((e) => e.id !== defauleEduGridElementItem.id);
    const isIncludeDefaultVal = Boolean(list.find((e) => e.id === defauleEduGridElementItem.id));
    const currentValIncludeDefaultVal = Boolean(state.find((e) => e.id === defauleEduGridElementItem.id));
    const isNeedReset = list.length === 0 || (isIncludeDefaultVal && !currentValIncludeDefaultVal);
    return !isNeedReset ? filteredVals : [defauleEduGridElementItem];
  })
  .reset([resetDomain, resetEduGridElementsFilter]);

sample({
  source: eduGridElements.$value,
  clock: eduGridElements.$value,
  target: $filteredEduGridElements,
});

sample({
  source: eduGridElements.$value,
  clock: $eduGridElementsFilter,
  fn: (source, filterVal) => {
    if (filterVal.find((e) => e.id === defauleEduGridElementItem.id)) return source;
    const idList = filterVal.map((e) => e.id);
    return source.filter((e) => idList.includes(e.id));
  },
  target: $filteredEduGridElements,
});
$filteredEduGridElements.reset(resetDomain);
