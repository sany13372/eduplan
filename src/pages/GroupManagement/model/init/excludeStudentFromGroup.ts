import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { StudentInfo } from '@src/pages/GroupManagement/model/types';
import { excludeStudent } from '@src/pages/GroupManagement/model';
import { excludeStudentFromGroupQuery } from '@src/pages/GroupManagement/model/init/queries';

connectDeleteActionNodes<StudentInfo>({
  nodes: excludeStudent,
  handler: async (student) => resolved(() => excludeStudentFromGroupQuery([student.id]), { noCache: true }),
  convertErrors: () => '',
});
