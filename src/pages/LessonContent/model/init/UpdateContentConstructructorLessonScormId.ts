import { updateContentConstructor, updateContentConstructorFx } from '@src/pages/LessonContent/model';
import { resolved } from '@src/gql-client';
import { sample } from 'effector';

import { updateContentConstructorLessonScormIdMutation } from './queries';

sample({
  clock: updateContentConstructor,
  target: updateContentConstructorFx,
});
updateContentConstructorFx.use(async (lessonId) =>
  resolved(() => updateContentConstructorLessonScormIdMutation(lessonId), { noCache: true }),
);
