import { connectAddActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { StudentInfoInitialData } from '@src/pages/GroupManagement/model/types';
import { createStudentInfo, resetStudentModal } from '@src/pages/GroupManagement/model';
import { createStudentInfoMutation } from '@src/pages/GroupManagement/model/init/queries';
import { convertCreateUpdateStudentError } from '@src/pages/GroupManagement/model/validation';

connectAddActionNodes<StudentInfoInitialData>({
  nodes: createStudentInfo,
  handler: async (studentInfo) => resolved(() => createStudentInfoMutation(studentInfo), { noCache: true }),
  convertErrors: convertCreateUpdateStudentError,
  resetOn: [resetStudentModal],
  resetErrorsOn: [resetStudentModal],
});
