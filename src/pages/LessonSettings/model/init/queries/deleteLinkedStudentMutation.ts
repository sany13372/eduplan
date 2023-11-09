import { UnlinkStudentData } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const deleteLinkedStudentMutation = (data: UnlinkStudentData): string => {
  const res = mutation.removeImplementationStudents({
    input: { implementationId: data.stream.lessonImplId, studentIds: [data.student.id] },
  });
  return res && Number.isInteger(res) && res > 0 ? data.student.id : '';
};
