import { LinkTeachersData } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const linkTeachersMutation = (data: LinkTeachersData): string => {
  const resp = mutation.setImplementationEmployees({
    input: {
      employeeIds: data.teachers.map((e) => e.id),
      implementationId: data.stream.lessonImplId,
    },
  });
  return Array.isArray(resp) && resp.length > 0 ? data.stream.id : '';
};
