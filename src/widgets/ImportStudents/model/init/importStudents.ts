import { connectGetActionNodes } from '@utils/effector';
import { importStudents, resetDomain } from '@src/widgets/ImportStudents/model';
import { importStudentsMutation } from '@src/widgets/ImportStudents/model/init/queries';

connectGetActionNodes({
  nodes: importStudents,
  handler: async (param) => {
    const resp = await importStudentsMutation(param);
    return resp.data;
  },
  resetOn: [resetDomain],
});
