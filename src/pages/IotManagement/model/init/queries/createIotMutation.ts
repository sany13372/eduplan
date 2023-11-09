import { mutation } from '@src/gql-client';
import { AddIotData } from '@src/pages/IotManagement/model/types';

export const createIotMutation = ({ studentIdList, iotTemplateData }: AddIotData): string => {
  const resp = mutation.addStudentTrajectory({
    studentIds: studentIdList,
    studentTrajectory: {
      templateId: iotTemplateData?.id ?? '',
    },
  });

  return resp.length.toString() ?? '';
};
