import { query } from '@src/gql-client';

export const getAvailableTeacherCountQuery = (id: string): number => {
  const resp =
    query.getImplementationEmployees({
      input: {
        implementationId: id,
        linked: false,
      },
    }) ?? [];
  return resp?.length ?? 0;
};
