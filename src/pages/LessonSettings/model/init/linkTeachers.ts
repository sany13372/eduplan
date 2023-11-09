import { connectAddActionNodes, connectConfirmNodes } from '@utils/effector';
import { confirmLinkTeacherDrawerClose, linkTeachers, resetDomain } from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { linkTeachersMutation } from '@src/pages/LessonSettings/model/init/queries';
import { LinkTeachersData } from '@src/pages/LessonSettings/model/types';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';

connectAddActionNodes({
  nodes: linkTeachers,
  handler: async (data: LinkTeachersData) => resolved(() => linkTeachersMutation(data), { noCache: true }),
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
  convertErrors: () => ({}),
  disableToasts: true,
});

sample({
  clock: linkTeachers.addFx.doneData,
  fn: () => ({ message: 'Проверяющие добавлены' }),
  target: addSuccessToast,
});

sample({
  clock: linkTeachers.addFx.fail,
  fn: () => ({ message: 'Не удалось добавить проверяющих' }),
  target: addErrorToast,
});

connectConfirmNodes({
  nodes: confirmLinkTeacherDrawerClose,
  resetOn: [resetDomain],
});
