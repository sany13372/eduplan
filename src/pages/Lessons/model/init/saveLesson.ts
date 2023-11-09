import { connectAddActionNodes } from '@utils/effector';
import { convertCreateUpdateLessonError } from '@src/pages/Lessons/model/validation';
import { resolved } from '@src/gql-client';
import {
  saveLesson,
  resetDomain,
  $saveLessonParams,
  closeSaveLessonForm,
  showSaveLessonForm,
  saveLessonDoneEdit,
  saveLessonDoneNew,
  themesWithLessons,
} from '@src/pages/Lessons/model';
import { createLessonMutation, updateLessonMutation } from '@src/pages/Lessons/model/init/queries';
import { sample } from 'effector';
import { openSuccessToast } from '@src/utils/helpers/toast';

connectAddActionNodes({
  nodes: saveLesson,
  handler: async (data) =>
    resolved(() => (data.id ? updateLessonMutation(data) : createLessonMutation(data)), { noCache: true }),
  convertErrors: convertCreateUpdateLessonError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});

$saveLessonParams.on(showSaveLessonForm, (_, p) => p).reset(closeSaveLessonForm);

sample({
  clock: saveLessonDoneEdit,
  fn: () => 'Изменения сохранены',
  target: openSuccessToast,
});

sample({
  clock: saveLessonDoneNew,
  fn: () => 'Занятие добавлено',
  target: openSuccessToast,
});

sample({
  clock: saveLessonDoneNew,
  fn: ({ params: { eduPlanRowId } }) => eduPlanRowId,
  target: themesWithLessons.get,
});
