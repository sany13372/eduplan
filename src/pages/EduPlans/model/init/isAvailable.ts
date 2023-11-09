import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { isAvailableData } from '@src/pages/EduPlans/model';
import { getEduPlanIsAvailableQuery } from '@src/pages/EduPlans/model/init/queries';
import isUndefined from 'lodash/isUndefined';

connectGetActionNodes({
  nodes: isAvailableData,
  handler: async (eduPlanId) => {
    const resp = await resolved(() => getEduPlanIsAvailableQuery(eduPlanId), { noCache: true });
    if (isUndefined(resp) || resp) throw new Error('Not found');
    return true;
  },
});
