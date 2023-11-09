import { Student } from '@src/gql-client';
import { StudentInfo } from '@src/types';

export const studentToStudentInfo = (val: Student): StudentInfo => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { personRole, id, financingSource, course_setting, student_group, bookNumber, personalNumber } = val;
  const person = Array.isArray(personRole.person) && personRole.person.length > 0 ? personRole.person[0] : undefined;

  return {
    id: id ?? '',
    financingSource: {
      title: financingSource?.title ?? '',
      shortTitle: financingSource?.shortTitle ?? '',
    },
    course: course_setting?.course?.title ?? '',
    group: { id: student_group?.id ?? '', caption: student_group?.title ?? '' },
    bookNumber: bookNumber ?? '',
    personalNumber: personalNumber ?? '',
    fio: `${person?.identityCard?.lastName ?? ''} ${person?.identityCard?.firstName ?? ''} ${
      person?.identityCard?.middleName ?? ''
    }`,
    email: person?.user?.email ?? '',
  };
};
