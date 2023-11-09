import { mutation } from '@src/gql-client';

export const removeTeacherMutation = async (path: string): Promise<string> => {
  const data = path.split('.');
  const resp = mutation.removeActivityEmployee({
    activityEmployeeIdInput: {
      activityId: data[1] ?? '',
      employeeId: data[2] ?? '',
    },
  });
  return resp?.employeeId ?? '';
};
