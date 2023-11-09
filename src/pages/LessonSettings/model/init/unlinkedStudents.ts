import { connectGetActionNodes } from '@utils/effector';
import { initialUnlinkedStudents, resetDomain, unlinkedStudents } from '@src/pages/LessonSettings/model';
import { getStudentsListQuery } from '@src/pages/LessonSettings/model/init/queries';
import { resolved } from '@src/gql-client';
import { defaultStudentsData } from '@src/pages/LessonSettings/model/constants';

connectGetActionNodes({
  nodes: initialUnlinkedStudents,
  handler: async ({ filter, streamId }) =>
    resolved(
      () =>
        getStudentsListQuery({
          id: streamId,
          type: 'unlinked',
          fioFilter: filter,
          data: defaultStudentsData,
        }),
      { noCache: true },
    ),

  resetOn: [resetDomain],
});

unlinkedStudents.$value.on(initialUnlinkedStudents.getFx.doneData, (_, resp) => resp);
connectGetActionNodes({
  nodes: unlinkedStudents,
  handler: async ({ filter, streamId, students, pagination }) =>
    resolved(
      () =>
        getStudentsListQuery({
          id: streamId,
          type: 'unlinked',
          fioFilter: filter,
          data: { students, pagination },
        }),
      { noCache: true },
    ),
  resetOn: [resetDomain],
});
