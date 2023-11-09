import { mutation } from '@src/gql-client';
import { StudentInfo } from '@src/pages/StudentManagement/model/types';
import { dateToStudentDateString } from '@utils/date';

export const createStudentInfoMutation = ({
  spaceId,
  group,
  firstName,
  lastName,
  middleName,
  email,
  bookNumber,
  financingSource,
  course,
  hasNotInnNumber,
  innNumber,
  hasNotSnilsNumber,
  snilsNumber,
  personalNumber,
  sex,
  eduPlanId,
  birthDate,
}: StudentInfo): string => {
  const resp = mutation.addStudent({
    spaceId: spaceId ?? '',
    groupId: group?.id,
    lastName: lastName.trim(),
    firstName: firstName.trim(),
    middleName: middleName?.trim(),
    email: email.trim(),
    birthDate: birthDate ? dateToStudentDateString(birthDate) : undefined,
    bookNumber,
    courseId: course?.id,
    financingSourceId: financingSource?.id ?? '',
    innNumber: hasNotInnNumber ? undefined : innNumber?.trim(),
    personalNumber,
    sexId: sex?.id,
    snilsNumber: hasNotSnilsNumber ? undefined : snilsNumber?.trim(),
    eduPlanId: eduPlanId ?? '',
  });

  return resp?.id ?? '';
};
