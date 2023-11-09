import { connectAddActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { addIot, resetDomain } from '@src/pages/IotManagement/model';
import { convertCreateUpdateIotError } from '@src/pages/IotManagement/model/validation';

import { createIotMutation } from './queries';

connectAddActionNodes({
  nodes: addIot,
  handler: async (iotData) => resolved(() => createIotMutation(iotData), { noCache: true }),
  convertErrors: convertCreateUpdateIotError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
