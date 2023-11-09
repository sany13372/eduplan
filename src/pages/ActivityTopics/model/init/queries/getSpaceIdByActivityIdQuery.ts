import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';

export const getSpaceIdByActivityIdQuery = (activityId: string) => {
  const activity = castNotSkeleton(query.readEduPlanRow({ id: activityId }));
  return activity?.spaceId ?? '';
};
