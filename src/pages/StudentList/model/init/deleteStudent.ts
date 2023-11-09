import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { StudentInfo } from '@src/pages/StudentList/model/types';
import { deleteStudent } from '@src/pages/StudentList/model';
import { deleteStudentMutation } from '@src/pages/StudentList/model/init/queries';

connectDeleteActionNodes<StudentInfo>({
  nodes: deleteStudent,
  handler: async (groupItem) => resolved(() => deleteStudentMutation(groupItem.id), { noCache: true }),
  convertErrors: () => '',
});
