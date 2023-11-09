import { connectGetActionNodes } from '@utils/effector';
import { inviteTeacherList, resetDomainData, resetInviteTeacherList } from '@src/pages/Teachers/model';
import { resolved } from '@src/gql-client';
import { getInviteTeacherListQuery } from '@src/pages/Teachers/model/init/queries';
import { sample } from 'effector';
import { addErrorToast } from '@src/app/model';

connectGetActionNodes({
  nodes: inviteTeacherList,
  handler: async (path) => {
    const data = path.split('.');
    if (data.length < 2) throw new Error('Не найден идентификатор занятия');
    return resolved(() => getInviteTeacherListQuery(data[1]), { noCache: true });
  },
  resetOn: [resetDomainData, resetInviteTeacherList],
});

sample({
  source: inviteTeacherList.getFx.fail,
  fn: () => ({ message: 'Что-то пошло не так. Попробуйте ещё раз.' }),
  target: addErrorToast,
});
