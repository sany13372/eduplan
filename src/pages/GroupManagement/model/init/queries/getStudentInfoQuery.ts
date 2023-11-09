import { query } from '@src/gql-client';
import {StudentInfoInitialData} from '@src/pages/GroupManagement/model/types';

export const getStudentInfoQuery = (studentId: string): StudentInfoInitialData | null => {
  const student = query.getStudent({
    id: studentId,
  });

  const person = student?.studentPerson;

  const studentInfo = {
    id: studentId,
    group: student?.groupId ? { id: student.groupId ?? '', caption: '' } : undefined,
    email: person?.user?.email ?? '',
    firstName: person?.identityCard?.firstName ?? '',
    middleName: person?.identityCard?.middleName ?? '',
    lastName: person?.identityCard?.lastName ?? '',
    birthDate: person?.identityCard?.birthDate ? new Date(person?.identityCard?.birthDate) : undefined,
    sex: person?.identityCard?.sexId ? { id: person.identityCard.sexId, caption: '' } : undefined,
    snilsNumber: person?.snilsNumber ?? '',
    innNumber: person?.innNumber ?? '',
    hasNotSnilsNumber: Boolean(person?.snilsNumber) ? [] : [{id: 'has-not-snils', caption: ''}],
    hasNotInnNumber: Boolean(person?.innNumber) ? [] : [{id: 'has-not-inn', caption: ''}],
    personalNumber: student?.personalNumber ?? '',
    bookNumber: student?.bookNumber ?? '',
    financingSource: student?.financingSourceId ? { id: student.financingSourceId, caption: '' } : undefined,
    course: student?.courseId ? { id: student.courseId, caption: '' } : undefined,
    spaceId: student?.spaceId ?? '',
    eduPlanId: student?.eduPlanId ?? '',
  };

  return studentInfo;
};
