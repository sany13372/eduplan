import { connectAddActionNodes } from '@utils/effector';
import {addGroup, groupStudentModalApi, resetDomain} from '@src/pages/StudentGroupList/model';
import { resolved } from '@src/gql-client';
import { createGroupMutation } from '@src/pages/StudentGroupList/model/init/queries';
import { convertCreateUpdateGroupError } from '@src/pages/StudentGroupList/model/validation';
import {forward} from "effector";

connectAddActionNodes({
  nodes: addGroup,
  handler: async (groupItem) => resolved(() => createGroupMutation(groupItem), { noCache: true }),
  convertErrors: convertCreateUpdateGroupError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});

forward({
  from: groupStudentModalApi.close,
  to: addGroup.reset,
})