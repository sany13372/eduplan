import { connectGetActionNodes } from '@utils/effector';
import { resetDomain, uploadStudents } from '@src/widgets/ImportStudents/model';
import { uploadStudentsMutation } from '@src/widgets/ImportStudents/model/init/queries';

connectGetActionNodes({
  nodes: uploadStudents,
  handler: async (params) => {
    const resp = await uploadStudentsMutation(params);
    return resp.data.sessionId;
  },
  resetOn: [resetDomain],
});
