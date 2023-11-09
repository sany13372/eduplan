import { connectGetActionNodes } from '@utils/effector';
import {
  $linkedStudentsFioFilter,
  deleteLinkedStudent,
  initialLinkedStudents,
  linkedStudents,
  linkStudents,
  resetDomain,
} from '@src/pages/LessonSettings/model';
import { getStudentsListQuery } from '@src/pages/LessonSettings/model/init/queries';
import { resolved } from '@src/gql-client';
import { defaultStudentsData } from '@src/pages/LessonSettings/model/constants';
import { sample } from 'effector';

connectGetActionNodes({
  nodes: initialLinkedStudents,
  handler: async ({ filter, streamId }) =>
    resolved(
      () =>
        getStudentsListQuery({
          id: streamId,
          type: 'linked',
          fioFilter: filter,
          data: defaultStudentsData,
        }),
      { noCache: true },
    ),

  resetOn: [resetDomain],
});

linkedStudents.$value.on(initialLinkedStudents.getFx.doneData, (_, resp) => resp);
connectGetActionNodes({
  nodes: linkedStudents,
  handler: async ({ filter, streamId, students, pagination }) =>
    resolved(
      () =>
        getStudentsListQuery({
          id: streamId,
          type: 'linked',
          fioFilter: filter,
          data: { students, pagination },
        }),
      { noCache: true },
    ),
  resetOn: [resetDomain],
});

sample({
  clock: [linkStudents.addFx.done, deleteLinkedStudent.deleteFx.done],
  source: $linkedStudentsFioFilter,
  fn: (s, c) => ({
    filter: s,
    streamId: c.params.stream.lessonImplId,
  }),
  target: initialLinkedStudents.get,
});
