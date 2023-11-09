import {
  availableToLinkTeachersCount,
  deleteLinkedTeacher,
  linkTeachers,
  resetDomain,
} from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { getAvailableTeacherCountQuery } from '@src/pages/LessonSettings/model/init/queries';
import { connectGetActionNodes } from '@utils/effector';
import { sample } from 'effector';

connectGetActionNodes({
  nodes: availableToLinkTeachersCount,
  handler: async (id) => resolved(() => getAvailableTeacherCountQuery(id), { noCache: true }),
  resetOn: [resetDomain],
});
availableToLinkTeachersCount.$value.on(deleteLinkedTeacher.deleteFx.doneData, (state) => {
  return state + 1;
});

sample({
  clock: linkTeachers.addFx.done,
  fn: (c) => c.params.stream.lessonImplId,
  target: availableToLinkTeachersCount.get,
});
