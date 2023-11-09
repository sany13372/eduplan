import { connectDeleteActionNodes } from '@utils/effector';
import { deleteTeacher } from '@src/pages/Teachers/model';
import { sample } from 'effector';
import { addErrorToast } from '@src/app/model';
import { resolved } from '@src/gql-client';
import { removeTeacherMutation } from '@src/pages/Teachers/model/init/queries';

connectDeleteActionNodes<string>({
  nodes: deleteTeacher,
  handler: async (path) => {
    return resolved(() => removeTeacherMutation(path), { noCache: true });
  },
  convertErrors: () => 'Что-то пошло не так. Попробуйте ещё раз.',
});

sample({
  source: deleteTeacher.deleteFx.failData,
  fn: () => ({ message: 'Что-то пошло не так. Попробуйте ещё раз.' }),
  target: addErrorToast,
});
