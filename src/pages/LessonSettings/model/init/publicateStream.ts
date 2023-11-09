import { sample } from 'effector';
import { toggleStreamIsPubl, toggleStreamIsPublFx } from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { toggleIsPublMutation } from '@src/pages/LessonSettings/model/init/queries';

sample({
  clock: toggleStreamIsPubl,
  target: toggleStreamIsPublFx,
});

toggleStreamIsPublFx.use((val) => resolved(() => toggleIsPublMutation(val), { noCache: true }));
