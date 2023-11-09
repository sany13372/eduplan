import { connectUpdateActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { confirmLesson, resetDomain } from '@src/pages/Lessons/model';
import { confirmLessonMutation } from '@src/pages/Lessons/model/init/queries';

connectUpdateActionNodes({
  nodes: confirmLesson,
  handler: async ({ lessonId, isAllowRegistration }) => {
    return resolved(() => confirmLessonMutation({ id: lessonId, isAllowRegistration }), { noCache: true });
  },
  convertErrors: () => ({}),
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
