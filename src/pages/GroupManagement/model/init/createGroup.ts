import { connectAddActionNodes } from '@utils/effector';
import { addGroup, resetDomain } from '@src/pages/GroupManagement/model';
import { convertCreateUpdateGroupError } from '@src/pages/GroupManagement/model/validation';
import { resolved } from '@src/gql-client';
import { createGroupMutation } from '@src/pages/GroupManagement/model/init/queries';

connectAddActionNodes({
  nodes: addGroup,
  handler: async (groupItem) => resolved(() => createGroupMutation(groupItem), { noCache: true }),
  convertErrors: convertCreateUpdateGroupError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
