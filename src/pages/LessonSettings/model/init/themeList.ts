import { $themeListStore, getInitDataFx, resetDomain } from '@src/pages/LessonSettings/model';

$themeListStore
  .on(getInitDataFx.doneData, (_, val) => {
    return val.themes;
  })
  .reset(resetDomain);
