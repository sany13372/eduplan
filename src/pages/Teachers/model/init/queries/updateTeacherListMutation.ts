import { UpdateTeacherListData } from '@src/pages/Teachers/model/types';
import { mutation } from '@src/gql-client';

export const updateTeacherListMutation = async ({ teacherList, path }: UpdateTeacherListData): Promise<string> => {
  const resp =
    mutation.addActivityEmployees({
      activityEmployeeInput: {
        activityId: path.split('.')[1] ?? '',
        employeeIds: teacherList.map((e) => e.id),
      },
    }) ?? [];
  return `${resp.length ?? ''}`;
};
