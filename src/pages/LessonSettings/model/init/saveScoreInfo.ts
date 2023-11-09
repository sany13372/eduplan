import { sample } from 'effector';
import {
  $saveScoreInfoErrorsStore,
  confirmUpdateScoreInfoDrawerClose,
  resetDomain,
  saveScoreInfo,
  saveScoreInfoFx,
} from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { saveScoreInfoMutation } from '@src/pages/LessonSettings/model/init/queries';
import { addErrorToast, addSuccessToast } from '@src/app/model';
import { connectConfirmNodes } from '@utils/effector';

sample({
  clock: saveScoreInfo,
  target: saveScoreInfoFx,
});

saveScoreInfoFx.use((val) => resolved(() => saveScoreInfoMutation(val), { noCache: true }));

$saveScoreInfoErrorsStore
  .on(saveScoreInfoFx.fail, (state) => {
    return state;
  })
  .reset(resetDomain);

sample({
  clock: saveScoreInfoFx.doneData,
  fn: () => ({ message: 'Форма контроля настроена' }),
  target: addSuccessToast,
});

sample({
  clock: saveScoreInfoFx.fail,
  fn: () => ({ message: 'Не удалось настроить форму контроля' }),
  target: addErrorToast,
});

connectConfirmNodes({
  nodes: confirmUpdateScoreInfoDrawerClose,
  resetOn: [resetDomain],
});
