import { connectDeleteActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { Stream } from '@src/pages/LessonSettings/model/types';
import { deleteStream } from '@src/pages/LessonSettings/model';
import { deleteStreamMutation } from '@src/pages/LessonSettings/model/init/queries';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';

connectDeleteActionNodes<Stream>({
  nodes: deleteStream,
  handler: async (stream) => {
    const resp = await resolved(() => deleteStreamMutation(stream), { noCache: true });
    if (!resp) throw new Error('Could not remove stream');
    return resp;
  },
  convertErrors: () => '',
  showErrorToast: false,
});

sample({
  clock: deleteStream.deleteFx.doneData,
  fn: () => ({ message: 'Поток удален' }),
  target: addSuccessToast,
});

sample({
  clock: deleteStream.deleteFx.fail,
  fn: () => ({ message: 'Не удалось удалить поток' }),
  target: addErrorToast,
});
