import { connectDeleteActionNodes } from '@utils/effector';
import { deleteIotTemplate } from '@src/pages/IotTemplateList/model';
import { IotTemplateData } from '@src/pages/IotTemplateList/model/types';
import { convertRemoveError } from '@src/pages/IotTemplateList/model/validation';
import { resolved } from '@src/gql-client';

import { deleteIotTemplateMutation } from './queries';

connectDeleteActionNodes<IotTemplateData>({
  nodes: deleteIotTemplate,
  handler: async (params) => {
    const resp = await resolved(() => deleteIotTemplateMutation(params.id), { noCache: true });
    if (!resp) throw new Error('Не удалось удалить траекторию');
    return resp;
  },
  convertErrors: convertRemoveError,
});

deleteIotTemplate.deleteFx.doneData.watch(() => deleteIotTemplate.reset());
