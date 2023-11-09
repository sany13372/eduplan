import { connectDeleteActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { deleteScoreInfo } from '@src/pages/LessonSettings/model';
import { deleteScoreInfoMutation } from '@src/pages/LessonSettings/model/init/queries';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';

connectDeleteActionNodes({
  nodes: deleteScoreInfo,
  handler: async (scoreInfo) => resolved(() => deleteScoreInfoMutation(scoreInfo), { noCache: true }),
  convertErrors: () => '',
});

sample({
  clock: deleteScoreInfo.deleteFx.doneData,
  fn: () => ({ message: 'Форма контроля удалена' }),
  target: addSuccessToast,
});

sample({
  clock: deleteScoreInfo.deleteFx.fail,
  fn: () => ({ message: 'Не удалось удалить форму контроля' }),
  target: addErrorToast,
});
