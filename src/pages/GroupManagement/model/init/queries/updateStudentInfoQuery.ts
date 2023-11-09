import {StudentInfoInitialData} from '@src/pages/GroupManagement/model/types';
import { mutation } from '@src/gql-client';
import { dateToStudentDateString } from '@utils/date';

export const updateStudentInfoQuery = ({
  id,
  group,
  email,
  firstName,
  middleName,
  lastName,
  birthDate,
  sex,
  snilsNumber,
  hasNotSnilsNumber,
  innNumber,
  hasNotInnNumber,
  personalNumber,
  bookNumber,
  financingSource,
  course,
  eduPlanId,
  spaceId,
}: StudentInfoInitialData) => {
  const res = mutation.setStudent({
    StudentInput: {
      id,
      groupId: group?.id ?? undefined,
      email,
      firstName,
      middleName,
      lastName,
      birthDate: birthDate ? dateToStudentDateString(birthDate) : undefined,
      sexId: sex?.id,
      snilsNumber: hasNotSnilsNumber.length ? null : snilsNumber,
      innNumber: hasNotInnNumber.length ? null : innNumber,
      personalNumber,
      bookNumber,
      financingSourceId: financingSource?.id ?? '',
      courseId: course?.id,
      eduPlanId: eduPlanId ?? '',
      spaceId: spaceId ?? '',
    },
  });

  return res?.id ?? '';
};
