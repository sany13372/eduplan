import { connectAddActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { linkStudents, resetDomain } from '@src/widgets/ChooseStudents/model';
import { addStudentsToGroupQuery } from '@src/widgets/ChooseStudents/model/init/queries';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';

connectAddActionNodes({
  nodes: linkStudents,
  handler: async (data) => resolved(() => addStudentsToGroupQuery(data), { noCache: true }),
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
  convertErrors: () => ({}),
  disableToasts: true,
});

sample({
  clock: linkStudents.addFx.doneData,
  fn: () => ({ message: 'Данные успешно обновлены' }),
  target: addSuccessToast,
});

sample({
  clock: linkStudents.addFx.fail,
  fn: () => ({ message: 'Не удалось обновить данные' }),
  target: addErrorToast,
});
