import { connectUpdateActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { publicateLesson, resetDomain } from '@src/pages/Lessons/model';
import { publicateLessonMutation } from '@src/pages/Lessons/model/init/queries';

connectUpdateActionNodes({
  nodes: publicateLesson,
  handler: async ({ itemInfo: { settings } }) => {
    if (!settings) throw new Error('Для данного занятия отсутствует реализация.');
    return resolved(() => publicateLessonMutation(settings), { noCache: true });
  },
  convertErrors: () => ({}),
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
