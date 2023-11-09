import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { resetDomain } from '@src/pages/IotTemplateList/model';
import { iotTemplates } from '@src/pages/IotManagement/model';
import { getIotTemplatesQuery } from '@src/pages/IotManagement/model/init/queries';

connectGetActionNodes({
  nodes: iotTemplates,
  handler: async (params) => resolved(() => getIotTemplatesQuery(params), { noCache: true }),
  resetOn: [resetDomain],
});
