import { $filters, resetDomain, setThemeFilter } from '@src/pages/Lessons/model';
import { defaultObj } from '@src/pages/Lessons/model/constants';

$filters
  .on(setThemeFilter, (state, list) => {
    const filteredVals = list.filter((e) => e.id !== defaultObj.id);
    const isIncludeDefaultVal = Boolean(list.find((e) => e.id === defaultObj.id));
    const currentValIncludeDefaultVal = Boolean(state.find((e) => e.id === defaultObj.id));
    const isNeedReset = list.length === 0 || (isIncludeDefaultVal && !currentValIncludeDefaultVal);
    return !isNeedReset ? filteredVals : [defaultObj];
  })
  .reset(resetDomain);
