import { query, StringOperationEnum } from '@src/gql-client';

export const getStudentsEduplanCountQuery = (eduPlanId: string): number => {
  const resp2 = query.getStudents({
    pageSize: 1,
    pageIndex: 0,
    studentFilter: { eduPlanId: { value: eduPlanId, operator: StringOperationEnum.EQUALS } },
  });
  return resp2?.count ?? 0;
};
