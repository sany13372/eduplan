import {
  availableToLinkStudentsCount,
  deleteLinkedStudent,
  linkStudents,
  resetDomain,
} from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';

import { getAvailableStudentsCountQuery } from './queries';

connectGetActionNodes({
  nodes: availableToLinkStudentsCount,
  handler: async (id) => resolved(() => getAvailableStudentsCountQuery(id), { noCache: true }),
  resetOn: [resetDomain],
});
availableToLinkStudentsCount.$value
  .on(linkStudents.addFx.done, (state, { params }) => {
    return params.linkAll ? 0 : state - params.students.length;
  })
  .on(deleteLinkedStudent.deleteFx.doneData, (state) => {
    return state + 1;
  });
