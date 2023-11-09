import { connectDeleteActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { UnlinkTeachersData } from '@src/pages/LessonSettings/model/types';
import { deleteLinkedTeacher } from '@src/pages/LessonSettings/model';
import { deleteLinkedTeacherMutation } from '@src/pages/LessonSettings/model/init/queries';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';

connectDeleteActionNodes<UnlinkTeachersData>({
  nodes: deleteLinkedTeacher,
  handler: async (data) => {
    const resp = await resolved(() => deleteLinkedTeacherMutation(data), { noCache: true });
    if (!resp) throw new Error('Could not remove stream');
    return resp;
  },
  convertErrors: () => '',
  showErrorToast: false,
});

sample({
  clock: deleteLinkedTeacher.deleteFx.doneData,
  fn: () => ({ message: 'Проверяющий исключен' }),
  target: addSuccessToast,
});

sample({
  clock: deleteLinkedTeacher.deleteFx.fail,
  fn: () => ({ message: 'Не удалось исключить проверяющего' }),
  target: addErrorToast,
});
