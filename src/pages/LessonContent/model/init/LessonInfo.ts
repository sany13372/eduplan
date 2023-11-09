import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { deleteSCORM, lessonInfoStore, resetDomain, uploadScormFx } from '@src/pages/LessonContent/model';
import { getActivityRowInfoQuery, getLessonInfoQuery } from '@src/pages/LessonContent/model/init/queries';
import { sample } from 'effector';

connectGetActionNodes({
  nodes: lessonInfoStore,
  handler: async (lessonId) => {
    const activityRowInfo = await resolved(() => getActivityRowInfoQuery(lessonId), { noCache: true });
    const lessonInfo = await resolved(() => getLessonInfoQuery(lessonId), { noCache: true });

    return { ...activityRowInfo, ...lessonInfo };
  },
  resetOn: [resetDomain],
});

sample({
  clock: uploadScormFx.done,
  fn: (clock) => clock.params.lessonId,
  target: lessonInfoStore.getFx,
});

lessonInfoStore.$value.on(deleteSCORM.deleteFx.doneData, (state) => {
  return {
    ...state,
    scormPackage: undefined,
  };
});
