import { query } from '@src/gql-client';
import { parseEventReference } from '@src/pages/Events/model/mappers';

export const readEventVideoConfKinds = () => {
  const resp = query.readVideoConfKinds();
  return resp?.map(parseEventReference) ?? [];
};
