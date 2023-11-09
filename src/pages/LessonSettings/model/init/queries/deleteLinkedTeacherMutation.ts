import { UnlinkTeachersData } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const deleteLinkedTeacherMutation = (data: UnlinkTeachersData): string => {
  const res = mutation.deleteImplementationEmployees({
    input: { implementationId: data.stream.lessonImplId, employeeIds: [data.teacher.id] },
  });
  return res && Number.isInteger(res) && res > 0 ? data.teacher.id : '';
};
