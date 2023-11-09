import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { Period } from '@src/pages/Periods/model/types';
import { deletePeriod } from '@src/pages/Periods/model';
import { deletePeriodMutation } from '@src/pages/Periods/model/init/queries';

connectDeleteActionNodes<Period>({
  nodes: deletePeriod,
  handler: async (obj: Period) => resolved(() => deletePeriodMutation(obj.id), { noCache: true }),
  convertErrors: () => '',
});
