import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import {
  $componentKindList,
  getComponentKindList,
  getComponentKindListFx,
  resetCreateGroupActivityInfo,
} from '@src/pages/ActivityManagement/model';
import { getComponentKindListQuery } from '@src/pages/ActivityManagement/model/init/queries';

forward({
  from: getComponentKindList,
  to: getComponentKindListFx,
});

getComponentKindListFx.use(async (eduProgId) =>
  resolved(() => getComponentKindListQuery(eduProgId), { noCache: true }),
);
getComponentKindListFx.fail.watch(() => addErrorToast({}));

$componentKindList.on(getComponentKindListFx.doneData, (_, res) => res).reset(resetCreateGroupActivityInfo);
