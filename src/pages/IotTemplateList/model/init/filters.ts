import {
  $filters,
  resetDomain,
  resetFilter,
  setGridElementListFilter,
  setTitleFilter,
} from '@src/pages/IotTemplateList/model';
import { defaultObj } from '@src/pages/IotTemplateList/model/constants';

$filters
  .on(setTitleFilter, (state, title) => ({ ...state, title }))
  .on(setGridElementListFilter, (state, list) => {
    const filteredVals = list.filter((e) => e.id !== defaultObj.id);
    const isIncludeDefaultVal = Boolean(list.find((e) => e.id === defaultObj.id));
    const currentValIncludeDefaultVal = Boolean(state.gridElementList.find((e) => e.id === defaultObj.id));
    const isNeedReset = list.length === 0 || (isIncludeDefaultVal && !currentValIncludeDefaultVal);
    return { ...state, gridElementList: !isNeedReset ? filteredVals : [defaultObj] };
  })
  .reset([resetDomain, resetFilter]);
