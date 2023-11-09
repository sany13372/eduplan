import { sample } from 'effector';
import {
  $createStreamErrorsStore,
  createStream,
  createStreamFx,
  resetDomain,
  confirmCreateStreamDrawerClose,
} from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { createStreamMutation } from '@src/pages/LessonSettings/model/init/queries';
import { addErrorToast, addSuccessToast } from '@src/app/model';
import { connectConfirmNodes } from '@utils/effector';

sample({
  clock: createStream,
  target: createStreamFx,
});

createStreamFx.use((val) => resolved(() => createStreamMutation(val), { noCache: true }));

$createStreamErrorsStore
  .on(createStreamFx.fail, (state) => {
    return state;
  })
  .reset(resetDomain);

sample({
  clock: createStreamFx.doneData,
  fn: () => ({ message: 'Поток добавлен' }),
  target: addSuccessToast,
});

sample({
  clock: createStreamFx.fail,
  fn: () => ({ message: 'Не удалось добавить поток' }),
  target: addErrorToast,
});

connectConfirmNodes({
  nodes: confirmCreateStreamDrawerClose,
  resetOn: [resetDomain],
});
