import { connectDeleteActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { deleteGroupMutation } from '@src/pages/StudentGroupList/model/init/queries/deleteGroupMutation';
import { deleteGroup } from '@src/pages/StudentGroupList/model';
import { Reference } from '@src/types';

connectDeleteActionNodes<Reference>({
  nodes: deleteGroup,
  handler: async (groupItem) => resolved(() => deleteGroupMutation(groupItem.id), { noCache: true }),
  convertErrors: () => '',
});
