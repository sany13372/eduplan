import { connectUpdateActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { resetDomain, updateLinkedStudents } from '@src/pages/Lessons/model';
import { linkStudentsMutation } from '@src/pages/Lessons/model/init/queries';

connectUpdateActionNodes({
  nodes: updateLinkedStudents,
  handler: async (data) => resolved(() => linkStudentsMutation(data), { noCache: true }),
  convertErrors: () => ({}),
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
