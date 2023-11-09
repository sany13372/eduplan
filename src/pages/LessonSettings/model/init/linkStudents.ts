import { connectAddActionNodes, connectConfirmNodes } from '@utils/effector';
import { confirmLinkStudentDrawerClose, linkStudents, resetDomain } from '@src/pages/LessonSettings/model';
import { LinkStudentsData } from '@src/pages/LessonSettings/model/types';
import { resolved } from '@src/gql-client';
import { linkAllStudentsMutation, linkStudentsMutation } from '@src/pages/LessonSettings/model/init/queries';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';

connectAddActionNodes({
  nodes: linkStudents,
  handler: async (data: LinkStudentsData) =>
    resolved(() => (data.linkAll ? linkAllStudentsMutation(data) : linkStudentsMutation(data)), { noCache: true }),
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
  convertErrors: () => ({}),
  disableToasts: true,
});

sample({
  clock: linkStudents.addFx.doneData,
  fn: () => ({ message: 'Обучающиеся добавлены' }),
  target: addSuccessToast,
});

sample({
  clock: linkStudents.addFx.fail,
  fn: () => ({ message: 'Не удалось добавить обучающихся' }),
  target: addErrorToast,
});

connectConfirmNodes({
  nodes: confirmLinkStudentDrawerClose,
  resetOn: [resetDomain],
});
