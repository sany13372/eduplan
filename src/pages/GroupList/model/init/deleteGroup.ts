import { deleteGroup } from '@src/pages/GroupList/model';
import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { convertRemoveError } from '@src/pages/GroupList/model/validation';
import { deleteGroupMutation } from '@src/pages/GroupList/model/init/queries';
import { GroupInfo } from '@src/pages/GroupList/model/types';

connectDeleteActionNodes<GroupInfo>({
  nodes: deleteGroup,
  handler: async (groupItem) => resolved(() => deleteGroupMutation(groupItem.id), { noCache: true }),
  convertErrors: convertRemoveError,
});
