import {
  $filters,
  decrimentCurrentTabCount,
  $fullNameFilter,
  getInitFilters,
  getInitFiltersFx,
  resetDomainData,
  setDateFilter,
  setFullNameFilter,
  setKindFilter,
} from '@src/pages/Events/model';
import { sample } from 'effector';
import { resolved } from '@src/gql-client';
import { getInitFiltersQuery } from '@src/pages/Events/model/init/queries';
import { dateToEventsDateString } from '@utils/date';

sample({
  clock: getInitFilters,
  source: $filters,
  fn: (source, clock) => {
    return {
      ...source,
      tabs: source.tabs.map((e) => ({ ...e, isSelected: e.id === clock.tab })),
      eduPlanId: clock.eduplanId,
      participantId: clock.participantId,
    };
  },
  target: getInitFiltersFx,
});

getInitFiltersFx.use(async (params) => {
  const dateTime = dateToEventsDateString(new Date(new Date().toDateString()));
  const resp = await resolved(() => getInitFiltersQuery(params, dateTime), { noCache: true });
  return resp;
});
$filters
  .on(getInitFiltersFx.doneData, (_, newVal) => newVal)
  .on(setKindFilter, (state, kindFilterVal) => {
    const { kinds } = state;
    return {
      ...state,
      kinds: kinds.map((e) => ({ ...e, isSelected: e.id === kindFilterVal.id })),
    };
  })
  .on(setDateFilter, (state, dateFilterVal) => {
    const { tabs } = state;
    return {
      ...state,
      tabs: tabs.map((e) => ({ ...e, isSelected: e.id === dateFilterVal.id })),
    };
  })
  .on(decrimentCurrentTabCount, (state) => {
    return {
      ...state,
      tabs: state.tabs.map((e) => {
        if (!e.isSelected) return e;
        return { ...e, count: e.count >= 1 ? e.count - 1 : 0 };
      }),
    };
  })
  .reset([resetDomainData]);

$fullNameFilter.on(setFullNameFilter, (_, val) => val).reset(resetDomainData);
