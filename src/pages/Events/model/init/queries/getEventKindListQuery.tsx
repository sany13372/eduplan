import { query } from '@src/gql-client';
import { parseEventReference } from '@src/pages/Events/model/mappers';

export const getEventKindListQuery = () => {
  const resp = query.getEduPlanEventKinds;
  return resp?.map(parseEventReference) ?? [];
};
