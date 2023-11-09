import { sample } from 'effector';
import { activityName, LessonsGate, resetDomain, themesWithLessons } from '@src/pages/Lessons/model';

sample({
  clock: LessonsGate.open,
  fn: ({ eduPlanRowId }) => eduPlanRowId,
  target: [themesWithLessons.get, activityName.get],
});

sample({
  clock: LessonsGate.close,
  target: resetDomain,
});
