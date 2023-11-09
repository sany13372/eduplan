import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import { $eduPlanList, deleteEduPlanFx, getEduPlanList, getEduPlanListFx } from '@src/pages/EduPlansList/model';
import { addErrorToast } from '@src/app/model';
import { getEduPlanListQuery } from '@src/pages/EduPlansList/model/init/queries/getEduPlanListQuery';

forward({
  from: getEduPlanList,
  to: getEduPlanListFx,
});

getEduPlanListFx.use(async (params) => resolved(() => getEduPlanListQuery(params), { noCache: true }));

getEduPlanListFx.fail.watch(() => addErrorToast({}));

$eduPlanList
  .on(getEduPlanListFx.doneData, (_, res) => res)
  .on(deleteEduPlanFx.doneData, (state, id) => {
    const itemsCount = state.totalItemCount - 1;
    return {
      totalItemCount: itemsCount > 0 ? itemsCount : 0,
      items: state.items.filter((e) => e.id !== id),
    };
  });
