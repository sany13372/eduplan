import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import {
  $filteredIotTemplateStore,
  $filters,
  deleteIotTemplate,
  iotTemplateStore,
  resetDomain,
} from '@src/pages/IotTemplateList/model';
import { sample } from 'effector';

import { getIotTemplateListQuery } from './queries';

export function fuzzyMatch(pattern: string, str: string): boolean {
  const regexpPattern = `.*${pattern}.*`;
  const re = new RegExp(regexpPattern, 'i');
  return re.test(str);
}

connectGetActionNodes({
  nodes: iotTemplateStore,
  handler: async (eduPlanId) => resolved(() => getIotTemplateListQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

iotTemplateStore.$value.on(deleteIotTemplate.deleteFx.doneData, (state, val) => {
  return state.filter((e) => e.id !== val);
});

sample({
  source: iotTemplateStore.$value,
  clock: iotTemplateStore.$value,
  target: $filteredIotTemplateStore,
});

sample({
  source: iotTemplateStore.$value,
  clock: $filters,
  fn: (source, clock) => {
    return source.filter((el) => fuzzyMatch(clock.title, el.title));
  },
  target: $filteredIotTemplateStore,
});
$filteredIotTemplateStore.reset(resetDomain);
