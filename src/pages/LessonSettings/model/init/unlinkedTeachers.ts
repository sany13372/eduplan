import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { resetDomain, unlinkedTeachers } from '@src/pages/LessonSettings/model';

import { getTeachersListQuery } from './queries';

connectGetActionNodes({
  nodes: unlinkedTeachers,
  handler: async (id) => resolved(() => getTeachersListQuery({ id, type: 'unlinked' }), { noCache: true }),
  resetOn: [resetDomain],
});
