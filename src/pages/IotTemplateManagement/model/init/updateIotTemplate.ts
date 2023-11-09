import { connectUpdateActionNodes } from '@utils/effector';
import { resetDomain, updateIotTemplate } from '@src/pages/IotTemplateManagement/model';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';
import { convertCreateUpdateTemplateError } from '@src/pages/IotTemplateManagement/model/validation';
import { resolved } from '@src/gql-client';
import { updateIotTemplateMutation } from '@src/pages/IotTemplateManagement/model/init/queries';

connectUpdateActionNodes<IotTemplate>({
  nodes: updateIotTemplate,
  handler: async (template) => resolved(() => updateIotTemplateMutation(template), { noCache: true }),
  convertErrors: convertCreateUpdateTemplateError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
