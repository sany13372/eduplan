import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { Period } from '@src/pages/Periods/model/types';
import { deletePeriod, periodListInfo, resetDomain } from '@src/pages/Periods/model';
import { getPeriodListQuery } from '@src/pages/Periods/model/init/queries';

connectGetActionNodes<string, Period[]>({
  nodes: periodListInfo,
  handler: async (id: string) =>
    resolved(
      () => {
        return getPeriodListQuery(id);
      },
      { noCache: true },
    ),
  resetOn: [resetDomain],
});

periodListInfo.$value.on(deletePeriod.deleteFx.done, (state, { params }) => {
  return state.filter((e) => e.id !== params.id);
});
