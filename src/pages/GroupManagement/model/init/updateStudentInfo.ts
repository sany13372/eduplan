import { connectUpdateActionNodes } from '@utils/effector';
import { updateStudentInfo, resetStudentModal } from '@src/pages/GroupManagement/model';
import { resolved } from '@src/gql-client';
import { updateStudentInfoQuery } from './queries';

connectUpdateActionNodes({
  nodes: updateStudentInfo,
  handler: async (sdudentInfo) => resolved(() => updateStudentInfoQuery(sdudentInfo), { noCache: true }),
  convertErrors: () => ({}),
  resetOn: [resetStudentModal],
  resetErrorsOn: [resetStudentModal],
});
