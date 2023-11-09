import { connectAddActionNodes } from '@utils/effector';
import { addIotTemplate, resetDomain } from '@src/pages/IotTemplateManagement/model';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';
import { convertCreateUpdateTemplateError } from '@src/pages/IotTemplateManagement/model/validation';
import { createIotTemplateMutation } from '@src/pages/IotTemplateManagement/model/init/queries';
import { resolved } from '@src/gql-client';

connectAddActionNodes<IotTemplate>({
  nodes: addIotTemplate,
  handler: async (template) => resolved(() => createIotTemplateMutation(template), { noCache: true }),
  convertErrors: convertCreateUpdateTemplateError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
