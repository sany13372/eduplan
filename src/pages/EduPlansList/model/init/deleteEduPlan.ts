import {
  $deleteEduPlanError,
  $deleteEduPlanState,
  deleteEduPlan,
  deleteEduPlanFx,
  dismissDeleteEduPlanError,
  resetDeleteEduPlanState,
  setDeleteEduPlanState,
} from '@src/pages/EduPlansList/model';
import { sample } from 'effector';
import { addErrorToast } from '@src/app/model';
import { deleteEduPlanMutation } from '@src/pages/EduPlansList/model/init/queries';
import { resolved } from '@src/gql-client';

import { convertRemoveError } from '../validation';

sample({
  source: $deleteEduPlanState,
  clock: deleteEduPlan,
  fn: (source) => source,
  target: deleteEduPlanFx,
});

deleteEduPlanFx.use(async (id) => resolved(() => deleteEduPlanMutation(id), { noCache: true }));

deleteEduPlanFx.failData.watch(() => addErrorToast({}));

$deleteEduPlanState.on(setDeleteEduPlanState, (_, val) => val).reset([resetDeleteEduPlanState, deleteEduPlanFx.done]);

$deleteEduPlanError
  .on(deleteEduPlanFx.failData, (_, e) => convertRemoveError(e))
  .reset([dismissDeleteEduPlanError, deleteEduPlanFx.done]);
