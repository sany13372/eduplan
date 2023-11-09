import { query } from '@src/gql-client';
import { EventReference } from '@src/pages/Events/model/types';
import { parseEventReference } from '@src/pages/Events/model/mappers';

export const getEventFormatListQuery = (): EventReference[] => {
  const resp = query.getEduPlanEventFormats;
  return resp?.map(parseEventReference) ?? [];
};
