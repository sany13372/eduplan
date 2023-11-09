import { query } from '@src/gql-client';
import { isNotEmpty } from '@utils/typescriptUtils';
import { GetUsersDataParams, UsersData } from '@src/pages/EduPlans/model/types';
import { employeeTypeToTeacher } from '@src/utils/mappers';

export const getAvailableToLinkUsersQuery = ({
  teachers,
  pagination: { pageIndex, pageSize },
  planId,
}: GetUsersDataParams): UsersData => {
  const resp = query.getAvailableEduProgramAdmins({
    planId,
    pageSize,
    pageIndex: pageIndex * pageSize,
  });
  const newPageData = resp?.entities ?? [];
  return {
    teachers: [...teachers, ...newPageData.filter(isNotEmpty).map(employeeTypeToTeacher)],
    pagination: {
      count: resp?.count ?? 0,
      pageIndex: pageIndex + 1,
      pageSize,
    },
  };
};
