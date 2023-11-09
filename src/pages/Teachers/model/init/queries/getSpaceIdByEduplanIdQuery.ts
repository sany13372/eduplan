import { query } from '@src/gql-client';

export const getSpaceIdByEduplanIdQuery = async (id: string): Promise<string> => {
  const resp = query.readEduPlan({
    id,
  });
  return resp?.spaceId ?? '';
};
