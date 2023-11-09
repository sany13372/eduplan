import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { deleteLinkedTeacher, linkedTeachers, linkTeachers, resetDomain } from '@src/pages/LessonSettings/model';
import { sortTeacherList } from '@src/pages/LessonSettings/model/utils';

import { getTeachersListQuery } from './queries';

connectGetActionNodes({
  nodes: linkedTeachers,
  handler: async (id) => resolved(() => getTeachersListQuery({ id, type: 'linked' }), { noCache: true }),
  resetOn: [resetDomain],
});

linkedTeachers.$value
  .on(deleteLinkedTeacher.deleteFx.done, (state, { params }) => {
    return state.filter((e) => e.id !== params.teacher.id);
  })
  .on(linkTeachers.addFx.done, (state, { params }) => {
    return sortTeacherList(params.teachers);
  });
