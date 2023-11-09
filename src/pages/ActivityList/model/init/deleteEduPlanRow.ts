import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import {
  $deleteEduPlanRow,
  $deleteEduPlanRowError,
  deleteEduPlanRow,
  deleteEduPlanRowFx,
  dismissDeleteEduPlanRowError,
  resetDeleteEduPlanRow,
  setDeleteEduPlanRow,
} from '@src/pages/ActivityList/model';
import { deleteEduPlanRowMutation } from '@src/pages/ActivityList/model/init/queries';
import { convertRemoveEduPlanRowError } from '@src/pages/ActivityList/model/validation';

forward({
  from: deleteEduPlanRow,
  to: deleteEduPlanRowFx,
});

deleteEduPlanRowFx.use(async (item) => {
  const isDeleted = await resolved(() => deleteEduPlanRowMutation(item.id), { noCache: true });
  if (!isDeleted) throw new Error('Что-то пошло не так...');
  return item;
});

const deleteEduPlanRowFailed = deleteEduPlanRowFx.failData.map((e) => convertRemoveEduPlanRowError(e));

deleteEduPlanRowFailed.watch((validationError) => {
  if (!validationError) {
    addErrorToast({});
  }
});

$deleteEduPlanRowError
  .on(deleteEduPlanRowFailed, (_, e) => e)
  .reset([dismissDeleteEduPlanRowError, resetDeleteEduPlanRow, deleteEduPlanRowFx.doneData]);

$deleteEduPlanRow.on(setDeleteEduPlanRow, (_, val) => val).reset([resetDeleteEduPlanRow, deleteEduPlanRowFx.doneData]);
