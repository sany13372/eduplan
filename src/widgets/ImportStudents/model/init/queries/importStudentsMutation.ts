import { AxiosResponse } from 'axios';
import { importStudentsApiInstance } from '@utils/axios';
import { ImportUsersApiRoutes } from '@constants/uploadRoutes';
import { ImportStudentsDataType } from '@src/widgets/ImportStudents/model/types';

export const importStudentsMutation = async (sessionId: string): Promise<AxiosResponse<ImportStudentsDataType>> => {
  return importStudentsApiInstance.post(
    ImportUsersApiRoutes.CREATE_STUDENTS,
    { sessionId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
