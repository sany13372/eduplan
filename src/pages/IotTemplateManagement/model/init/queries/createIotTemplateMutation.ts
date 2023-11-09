import { mutation } from '@src/gql-client';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';

export const createIotTemplateMutation = ({ eduGridElementId, title, rows }: IotTemplate): string => {
  const resp = mutation.addEduTrajectoryTemplate({
    eduTrajectoryTemplate: {
      title,
      eduGridItemId: eduGridElementId,
    },
    eduPlanRowIds: rows.map((e) => e.id),
  });

  return resp?.id ?? '';
};
