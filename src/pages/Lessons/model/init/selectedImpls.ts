import { $selectedImpls, resetDomain, setSelectedImpls } from '@src/pages/Lessons/model';
import { addItems, getImplIdList, removeItems } from '@src/pages/Lessons/model/utils';

$selectedImpls
  .on(setSelectedImpls, (state, { items, isChecked, themeId }) => {
    const currentVal = state[themeId] ?? [];
    const idList = getImplIdList(items);
    const newVal = isChecked ? addItems(currentVal, idList) : removeItems(currentVal, idList);
    return { ...state, [themeId]: newVal };
  })
  .reset(resetDomain);
