import { $selectedFilterItemStore, resetDomain, setFilterItem } from '@src/pages/LessonSettings/model';

$selectedFilterItemStore
  .on(setFilterItem, (_, val) => {
    return val;
  })
  .reset(resetDomain);
