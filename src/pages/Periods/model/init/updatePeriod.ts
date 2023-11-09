import { connectUpdateActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { resetDomain, resetSetPeriodInfo, updatePeriod } from '@src/pages/Periods/model';
import { Period } from '@src/pages/Periods/model/types';
import { updatePeriodMutation } from '@src/pages/Periods/model/init/queries';
import { getSetPeriodErrors } from '@src/pages/Periods/model/validation';

connectUpdateActionNodes<Period>({
  nodes: updatePeriod,
  handler: async (periodItem) => resolved(() => updatePeriodMutation(periodItem), { noCache: true }),
  convertErrors: getSetPeriodErrors,
  resetOn: [resetDomain, resetSetPeriodInfo],
  resetErrorsOn: [resetDomain, resetSetPeriodInfo],
});
