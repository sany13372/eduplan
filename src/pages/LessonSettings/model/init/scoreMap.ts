import {
  $scoreInfoMapStore,
  deleteScoreInfo,
  getInitDataFx,
  resetDomain,
  saveScoreInfoFx,
} from '@src/pages/LessonSettings/model';
import { scoreInfoListToMap } from '@src/pages/LessonSettings/model/utils';

$scoreInfoMapStore
  .on(getInitDataFx.doneData, (_, val) => {
    return scoreInfoListToMap(val.scores);
  })
  .on(saveScoreInfoFx.doneData, (state, resp) => {
    return { ...state, [resp.lessonId]: resp };
  })
  .on(deleteScoreInfo.deleteFx.done, (state, { params }) => {
    const newState = { ...state };
    delete newState[params.lessonId];
    return newState;
  })
  .reset(resetDomain);
