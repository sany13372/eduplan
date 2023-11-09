import { connectGetActionNodes } from '@utils/effector';
import { studentInfo, resetStudentModal } from '@src/pages/GroupManagement/model';
import { resolved } from '@src/gql-client';

import { getStudentInfoQuery } from './queries';

connectGetActionNodes({
  nodes: studentInfo,
  handler: async (studentId: string) => resolved(() => getStudentInfoQuery(studentId), { noCache: true }),
  resetOn: [resetStudentModal],
});
