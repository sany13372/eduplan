import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { convertRemoveEduPlanRowError } from '@src/pages/ActivityManagement/model/validation';
import { deleteRow } from '@src/pages/ActivityManagement/model';

import { deleteEduPlanRowMutation } from './queries';

connectDeleteActionNodes({
  nodes: deleteRow,
  handler: async (item) => resolved(() => deleteEduPlanRowMutation(item.id), { noCache: true }),
  convertErrors: convertRemoveEduPlanRowError,
});
