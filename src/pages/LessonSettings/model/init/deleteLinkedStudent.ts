import { connectDeleteActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { UnlinkStudentData } from '@src/pages/LessonSettings/model/types';
import { deleteLinkedStudent } from '@src/pages/LessonSettings/model';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';

import { deleteLinkedStudentMutation } from './queries';

connectDeleteActionNodes<UnlinkStudentData>({
  nodes: deleteLinkedStudent,
  handler: async (data) => {
    const resp = await resolved(() => deleteLinkedStudentMutation(data), { noCache: true });
    if (!resp) throw new Error('Could not remove stream');
    return resp;
  },
  convertErrors: () => '',
  showErrorToast: false,
});

sample({
  clock: deleteLinkedStudent.deleteFx.doneData,
  fn: () => ({ message: 'Обучающийся исключен' }),
  target: addSuccessToast,
});

sample({
  clock: deleteLinkedStudent.deleteFx.fail,
  fn: () => ({ message: 'Не удалось исключить обучающегося' }),
  target: addErrorToast,
});
