import { connectUpdateActionNodes } from '@utils/effector';
import { resetDomain, updateGroup } from '@src/pages/StudentGroupList/model';
import { convertCreateUpdateGroupError } from '@src/pages/StudentGroupList/model/validation';
import { resolved } from '@src/gql-client';
import { updateGroupMutation } from '@src/pages/StudentGroupList/model/init/queries';

connectUpdateActionNodes({
  nodes: updateGroup,
  handler: async (groupItem) => resolved(() => updateGroupMutation(groupItem), { noCache: true }),
  convertErrors: convertCreateUpdateGroupError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});

