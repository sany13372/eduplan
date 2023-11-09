import { connectUpdateActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { lessonUpdatePriority, themesWithLessons } from '@src/pages/Lessons/model';
import { switchActivityRowsPriorityMutation } from '@src/pages/Lessons/model/init/queries';
import { sample } from 'effector';

connectUpdateActionNodes({
  nodes: lessonUpdatePriority,
  // @ts-ignore
  handler: async (lessonPriority) => {
    const data = await resolved(() => switchActivityRowsPriorityMutation(lessonPriority),{ noCache: true });
    return data
  },
  resetOn: [lessonUpdatePriority.reset],
  convertErrors: () => ({}),
  showSuccessToast:false
});

sample({
  clock: lessonUpdatePriority.updateFx.done,
  fn: ({params}) => params.eduPlanRowId,
  target: themesWithLessons.get,
});