import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import {StudentInfo} from '@src/pages/GroupManagement/model/types';
import { deleteStudent } from '@src/pages/GroupManagement/model';
import { deleteStudentMutation } from '@src/pages/GroupManagement/model/init/queries';

connectDeleteActionNodes<StudentInfo>({
  nodes: deleteStudent,
  handler: async (groupItem) => resolved(() => deleteStudentMutation(groupItem.id), { noCache: true }),
  convertErrors: () => '',
});
