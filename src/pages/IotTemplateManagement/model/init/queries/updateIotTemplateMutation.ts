import { mutation } from '@src/gql-client';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';

export const updateIotTemplateMutation = ({ eduGridElementId, title, rows, id }: IotTemplate): string => {
  const resp = mutation.setEduTrajectoryTemplate({
    eduTrajectoryTemplate: {
      id,
      title,
      eduGridItemId: eduGridElementId,
    },
    eduPlanRowIds: rows.map((e) => e.id),
  });

  return resp?.id ?? '';
};
