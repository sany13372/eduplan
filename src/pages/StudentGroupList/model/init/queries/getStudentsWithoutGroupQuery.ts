import { order_by, query, Student } from '@src/gql-client';

import { StudentInfo } from '../../types';

export const getStudentsWithoutGroupQuery = (planId: string) => {
  const students = query.readStudents({
    where: {
      personRole: {
        deleted_at: { _is_null: true },
      },
      groupId: { _is_null: true },
      eduPlanId: { _eq: planId },
    },
    order_by: [{ student_group: { id: order_by.asc } }],
  });

  const studentsInfo: StudentInfo[] = students.map(
    ({ id, financingSource, course_setting, student_group, bookNumber, personalNumber, personRole }) => {
      const person =
        Array.isArray(personRole.person) && personRole.person.length > 0 ? personRole.person[0] : undefined;

      return {
        id: id ?? '',
        financingSource: financingSource?.title ?? '',
        shortTitleFinancingSource: financingSource?.shortTitle ?? '',
        course: course_setting?.course?.title ?? '',
        group: student_group?.title ?? '',
        groupId: student_group?.id ?? '',
        bookNumber: bookNumber ?? '',
        personalNumber: personalNumber ?? '',
        fio: `${person?.identityCard?.lastName ?? ''} ${person?.identityCard?.firstName ?? ''} ${
          person?.identityCard?.middleName ?? ''
        }`,
        email: person?.user?.email ?? '',
      };
    },
  );

  return studentsInfo;
};
