import { $filterItemListStore, getInitDataFx, resetDomain } from '@src/pages/LessonSettings/model';
import { allThemeFilter } from '@src/pages/LessonSettings/model/constants';

$filterItemListStore
  .on(getInitDataFx.doneData, (_, val) => {
    return [allThemeFilter, ...val.filters];
  })
  .reset(resetDomain);
