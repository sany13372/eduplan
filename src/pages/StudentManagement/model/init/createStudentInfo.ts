import { connectAddActionNodes } from '@utils/effector';
import { createStudentInfo, resetDomain } from '@src/pages/StudentManagement/model';
import { convertCreateUpdateStudentError } from '@src/pages/StudentManagement/model/validation';
import { StudentInfo } from '@src/pages/StudentManagement/model/types';
import { createStudentInfoMutation } from '@src/pages/StudentManagement/model/init/queries';
import { resolved } from '@src/gql-client';

connectAddActionNodes<StudentInfo>({
  nodes: createStudentInfo,
  handler: async (studentInfo) => resolved(() => createStudentInfoMutation(studentInfo), { noCache: true }),
  convertErrors: convertCreateUpdateStudentError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
