import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';

export const getSpaceIdByEduProgIdQuery = (eduProgId: string): string => {
  const eduProg = castNotSkeleton(query.readEduProgram({ id: eduProgId }));
  return eduProg?.spaceId ?? '';
};
