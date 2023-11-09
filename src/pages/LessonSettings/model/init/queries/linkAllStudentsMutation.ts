import { LinkStudentsData } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const linkAllStudentsMutation = (data: LinkStudentsData): string => {
  const resp = mutation.addImplementationStudentsAll({
    implementationId: data.stream.lessonImplId,
  });
  return Array.isArray(resp) && resp.length > 0 ? resp.length.toString(10) : '';
};
