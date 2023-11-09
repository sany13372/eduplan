import { mutation } from '@src/gql-client';
import { dateToStudentDateString } from '@utils/date';
import {StudentInfoInitialData} from "@src/pages/GroupManagement/model/types";

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
}: StudentInfoInitialData): string => {
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
    innNumber: hasNotInnNumber.length ? undefined : innNumber?.trim(),
    personalNumber,
    sexId: sex?.id,
    snilsNumber: hasNotSnilsNumber ? undefined : snilsNumber?.trim(),
    eduPlanId: eduPlanId ?? '',
  });

  return resp?.id ?? '';
};
