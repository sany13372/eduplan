import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import {
  $categoryList,
  getCategoryList,
  getCategoryListFx,
  resetCreateActivityInfo,
} from '@src/pages/ActivityManagement/model';
import { getCategoryListQuery } from '@src/pages/ActivityManagement/model/init/queries';

forward({
  from: getCategoryList,
  to: getCategoryListFx,
});

getCategoryListFx.use(async (eduProgId) => resolved(() => getCategoryListQuery(eduProgId), { noCache: true }));
getCategoryListFx.fail.watch(() => addErrorToast({}));

$categoryList.on(getCategoryListFx.doneData, (_, res) => res).reset(resetCreateActivityInfo);
