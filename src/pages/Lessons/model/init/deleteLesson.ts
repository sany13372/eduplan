import { connectDeleteActionNodes } from '@utils/effector';
import { deleteLesson } from '@src/pages/Lessons/model';
import { convertRemoveError } from '@src/pages/Lessons/model/validation';
import { resolved } from '@src/gql-client';
import { deleteLessonMutation } from '@src/pages/Lessons/model/init/queries';

connectDeleteActionNodes({
  nodes: deleteLesson,
  handler: async ({ lessonId }) => resolved(() => deleteLessonMutation(lessonId), { noCache: true }),
  convertErrors: convertRemoveError,
});
