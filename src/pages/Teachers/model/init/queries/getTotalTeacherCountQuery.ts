import { BooleanOperationEnum, query, StringOperationEnum } from '@src/gql-client';

export const getTotalTeacherCountQuery = async (spaceId: string): Promise<number> => {
  const resp = query.getEmployeesPaging({
    employeeFilter: {
      spaceId: { operator: StringOperationEnum.EQUALS, value: spaceId },
      isPps: { operator: BooleanOperationEnum.EQUALS, value: true },
    },
  });
  return resp?.count ?? 0;
};
