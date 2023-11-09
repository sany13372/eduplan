import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { resetDomain, updateIotTemplateInitialData } from '@src/pages/IotTemplateManagement/model';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';

import { getUpdateIotTemplateInitialDataQuery } from './queries';

connectGetActionNodes<string, IotTemplate | null>({
  nodes: updateIotTemplateInitialData,
  handler: async (iotTemplateId) =>
    resolved(() => getUpdateIotTemplateInitialDataQuery(iotTemplateId), { noCache: true }),
  resetOn: [resetDomain],
});
