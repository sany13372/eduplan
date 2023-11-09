import { query } from '@src/gql-client';

export const getAvailableStudentsCountQuery = (id: string): number => {
  const resp = query.getImplementationStudents({
    implementationId: id,
    isLinked: false,
  });
  return resp?.count ?? 0;
};
