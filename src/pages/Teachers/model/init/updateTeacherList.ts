import { connectUpdateActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { resetDomainData, updateTeacherList } from '@src/pages/Teachers/model';

import { updateTeacherListMutation } from './queries';

connectUpdateActionNodes({
  nodes: updateTeacherList,
  handler: async (params) => {
    const id = await resolved(() => updateTeacherListMutation(params));

    return id;
  },
  convertErrors: () => ({}),
  resetOn: [resetDomainData],
  resetErrorsOn: [resetDomainData],
});
