import { sample } from 'effector';
import {
  $updateStreamErrorsStore,
  confirmUpdateStreamDatesDrawerClose,
  confirmUpdateStreamTitleDrawerClose,
  resetDomain,
  updateStream,
  updateStreamFx,
} from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { updateStreamMutation } from '@src/pages/LessonSettings/model/init/queries';
import { addErrorToast, addSuccessToast } from '@src/app/model';
import { connectConfirmNodes } from '@utils/effector';

sample({
  clock: updateStream,
  target: updateStreamFx,
});

updateStreamFx.use(({ val }) => resolved(() => updateStreamMutation(val), { noCache: true }));

$updateStreamErrorsStore
  .on(updateStreamFx.fail, (state) => {
    return state;
  })
  .reset(resetDomain);

sample({
  clock: updateStreamFx.done,
  fn: (c) => ({ message: c.params.successMessage }),
  target: addSuccessToast,
});

sample({
  clock: updateStreamFx.fail,
  fn: () => ({ message: 'Не удалось обновить данные потока' }),
  target: addErrorToast,
});

connectConfirmNodes({
  nodes: confirmUpdateStreamTitleDrawerClose,
  resetOn: [resetDomain],
});

connectConfirmNodes({
  nodes: confirmUpdateStreamDatesDrawerClose,
  resetOn: [resetDomain],
});
