import { sample } from 'effector';
import { eduKindStore, saveLesson, SaveLessonGate, saveLessonInitialData } from '@src/pages/Lessons/model';

sample({
  clock: SaveLessonGate.open,
  fn: (params) => params.themeId,
  target: eduKindStore.get,
});

sample({
  clock: SaveLessonGate.open,
  target: saveLessonInitialData.get,
});

sample({
  clock: SaveLessonGate.close,
  target: [saveLessonInitialData.reset, eduKindStore.reset, saveLesson.reset],
});
