import { AxiosResponse } from 'axios';
import { importStudentsApiInstance } from '@utils/axios';
import { ImportUsersApiRoutes } from '@constants/uploadRoutes';
import { UploadStudentsParamsType } from '@src/widgets/ImportStudents/model/types';

export const uploadStudentsMutation = async (
  params: UploadStudentsParamsType,
): Promise<AxiosResponse<{ sessionId: string }>> => {
  const dataFormat = () => {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('eduPlanId', params.eduPlanId);
    return formData;
  };
  const data = dataFormat();
  return importStudentsApiInstance.post(ImportUsersApiRoutes.LOADING_STUDENTS, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
