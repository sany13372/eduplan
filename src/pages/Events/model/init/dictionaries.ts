import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { eventFormatStore, eventKindStore, eventVideoConfKindsStore, resetDomainData } from '@src/pages/Events/model';
import {
  getEventFormatListQuery,
  getEventKindListQuery,
  readEventVideoConfKinds,
} from '@src/pages/Events/model/init/queries';

connectGetActionNodes({
  nodes: eventKindStore,
  handler: async () => resolved(() => getEventKindListQuery(), { noCache: true }),
  resetOn: [resetDomainData],
});

connectGetActionNodes({
  nodes: eventFormatStore,
  handler: async () => resolved(() => getEventFormatListQuery(), { noCache: true }),
  resetOn: [resetDomainData],
});

connectGetActionNodes({
  nodes: eventVideoConfKindsStore,
  handler: async () => resolved(() => readEventVideoConfKinds(), { noCache: true }),
  resetOn: [resetDomainData],
});
