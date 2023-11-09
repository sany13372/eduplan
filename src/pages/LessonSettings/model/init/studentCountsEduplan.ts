import { resetDomain, studentEduplanCounts } from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { getStudentsEduplanCountQuery } from '@src/pages/LessonSettings/model/init/queries/getStudentsEduplanCountQuery';

connectGetActionNodes({
  nodes: studentEduplanCounts,
  handler: async (id) => resolved(() => getStudentsEduplanCountQuery(id), { noCache: true }),
  resetOn: [resetDomain],
});
