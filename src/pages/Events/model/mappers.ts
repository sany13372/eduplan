import { EventFormatDTO, EventKindDTO, Maybe, VideoConfKind } from '@src/gql-client';

import { EventReference } from './types';

export const parseEventReference = (
  data: Maybe<EventFormatDTO> | Maybe<EventKindDTO> | Maybe<VideoConfKind>,
): EventReference => ({
  id: data?.id ?? '',
  caption: data?.title ?? '',
  systemCode: data?.systemCode ?? '',
  isSelected: false,
});

export const eventReferenceFromId = (id: Maybe<string> = ''): EventReference => ({
  id: id ?? '',
  caption: '',
  systemCode: '',
  isSelected: false,
});
