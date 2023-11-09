import { connectAddActionNodes, connectConfirmNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';
import { linkAdmins, linkAdminsCloseConfirm, resetDomainData } from '@src/pages/EduPlans/model';
import { setAdminsMutation } from '@src/pages/EduPlans/model/init/queries';

connectAddActionNodes({
  nodes: linkAdmins,
  handler: async (data: { checkedUsers: string[]; planId: string }) =>
    resolved(() => setAdminsMutation(data), { noCache: true }),
  resetOn: [resetDomainData],
  resetErrorsOn: [resetDomainData],
  convertErrors: () => ({}),
  disableToasts: true,
});

sample({
  clock: linkAdmins.addFx.doneData,
  fn: () => ({ message: 'Список администраторов обновлён' }),
  target: addSuccessToast,
});

sample({
  clock: linkAdmins.addFx.fail,
  fn: () => ({ message: 'Не удалось обновить список администраторов' }),
  target: addErrorToast,
});

connectConfirmNodes({
  nodes: linkAdminsCloseConfirm,
  resetOn: [resetDomainData],
});
