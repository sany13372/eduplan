import { connectAddActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { createPeriod, resetDomain, resetSetPeriodInfo } from '@src/pages/Periods/model';
import { NewPeriod } from '@src/pages/Periods/model/types';
import { createPeriodMutation } from '@src/pages/Periods/model/init/queries';
import { getSetPeriodErrors } from '@src/pages/Periods/model/validation';

connectAddActionNodes<NewPeriod>({
  nodes: createPeriod,
  handler: async (periodItem) => resolved(() => createPeriodMutation(periodItem), { noCache: true }),
  convertErrors: getSetPeriodErrors,
  resetOn: [resetDomain, resetSetPeriodInfo],
  resetErrorsOn: [resetDomain, resetSetPeriodInfo],
});
