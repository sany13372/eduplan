import { LinkStudentsData } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const linkStudentsMutation = (data: LinkStudentsData): string => {
  const resp = mutation.setImplementationStudents({
    input: {
      studentIds: data.students.map((e) => e.id),
      implementationId: data.stream.lessonImplId,
    },
  });
  return Array.isArray(resp) && resp.length > 0 ? resp.length.toString(10) : '';
};
