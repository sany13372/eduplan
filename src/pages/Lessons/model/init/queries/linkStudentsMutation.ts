import { mutation } from '@src/gql-client';
import { SelectedStudents } from '@src/pages/Lessons/model/types';

export const linkStudentsMutation = ({ idList, implIdList }: SelectedStudents): string => {
  const resp = mutation.editEduLesson2Student({
    lesson2StudentList: implIdList.map((e) => ({ eduLessonImplId: e, studentIds: idList })),
  });
  return resp && resp?.length >= 0 ? 'ok' : '';
};
