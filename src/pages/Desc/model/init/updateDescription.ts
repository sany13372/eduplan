import { connectUpdateActionNodes } from '@utils/effector';
import { resetDomainData, updateEduPlanDesc } from '@src/pages/Desc/model';
import { resolved } from '@src/gql-client';
import { updateDescMutation } from '@src/pages/Desc/model/init/queries';

connectUpdateActionNodes({
  nodes: updateEduPlanDesc,
  handler: async (params) => {
    const resp = await resolved(() => updateDescMutation(params), { noCache: true });
    if (!resp) throw new Error('Не удалось сохранить данные');
    return resp;
  },
  convertErrors: () => ({}),
  resetOn: [resetDomainData],
  resetErrorsOn: [resetDomainData],
});
