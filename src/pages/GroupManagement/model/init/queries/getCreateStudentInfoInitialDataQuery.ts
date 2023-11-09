import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import {StudentInfoInitialData} from '@src/pages/GroupManagement/model/types';



export const getCreateStudentInfoInitialDataQuery = ({
  planId,
  group,
}: {
  planId: string;
  group?: { id: string; caption: string };
}): null | StudentInfoInitialData => {
  const resp = query.readEduPlans({
    where: {
      id: { _eq: planId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить информацию об образовательном пространстве');

  return {
    id: '',
    eduPlanId: planId,
    group,
    email: '',
    firstName: '',
    middleName: undefined,
    lastName: '',
    birthDate: undefined,
    sex: undefined,
    hasNotSnilsNumber: [],
    snilsNumber: '',
    hasNotInnNumber: [],
    innNumber: '',
    personalNumber: undefined,
    bookNumber: undefined,
    course: undefined,
    financingSource: undefined,
    spaceId: castNotSkeleton(resp[0]).spaceId,
  };
};
