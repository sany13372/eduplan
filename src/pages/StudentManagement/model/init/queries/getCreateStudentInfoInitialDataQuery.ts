import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import { StudentInfo } from '@src/pages/StudentManagement/model/types';

export const getCreateStudentInfoInitialDataQuery = (eduPlanId: string): null | StudentInfo => {
  const resp = query.readEduPlans({
    where: {
      id: { _eq: eduPlanId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить информацию об образовательном пространстве');

  return {
    id: '',
    eduPlanId,
    group: undefined,
    email: '',
    firstName: '',
    middleName: undefined,
    lastName: '',
    birthDate: undefined,
    sex: undefined,
    hasNotSnilsNumber: false,
    snilsNumber: '',
    hasNotInnNumber: false,
    innNumber: '',
    personalNumber: undefined,
    bookNumber: undefined,
    course: undefined,
    financingSource: undefined,
    spaceId: castNotSkeleton(resp[0]).spaceId,
  };
};
