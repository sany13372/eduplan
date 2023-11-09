import { EmployeeType, query } from '@src/gql-client';
import { TeacherInfo } from '@src/pages/Teachers/model/types';
import { parseTeacherInfo } from '@src/pages/Teachers/model/mappers';
import isNil from 'lodash/isNil';
import sortBy from 'lodash/sortBy';

export const getInviteTeacherListQuery = async (activityId: string): Promise<TeacherInfo[]> => {
  const resp =
    query.getActivityEmployeesForInvitation({
      activityId,
    }) ?? [];
  const data: EmployeeType[] = resp?.filter((e) => !isNil(e)) as EmployeeType[];

  return sortBy(data.map(parseTeacherInfo), ['lastName', 'firstName', 'middleName']);
};
