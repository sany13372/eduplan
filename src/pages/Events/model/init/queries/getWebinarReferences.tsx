import { query } from '@src/gql-client';
import { EventReference } from '@src/pages/Events/model/types';
import { eventReferenceFromId, parseEventReference } from '@src/pages/Events/model/mappers';

type GetWebinarReferencesParams = {
  kindId: string;
  formatId: string;
  videoConfKindId: string;
};

export const getWebinarReferences = ({ kindId, formatId, videoConfKindId }: GetWebinarReferencesParams) => {
  const webinarKinds = query.getEduPlanEventKinds;
  const webinarFormats = query.getEduPlanEventFormats;
  const videoConfKinds = videoConfKindId ? query.readVideoConfKinds()?.map(parseEventReference) ?? [] : [];
  const kinds: EventReference[] = webinarKinds?.map(parseEventReference) ?? [];
  const formats: EventReference[] = webinarFormats?.map(parseEventReference) ?? [];
  const kind = kinds?.find((e) => e?.id === kindId);
  const format = formats?.find((e) => e?.id === formatId);
  const videoConfKind = videoConfKinds.find((e) => e?.id === videoConfKindId);
  return {
    kind: kind ?? eventReferenceFromId(''),
    format: format ?? eventReferenceFromId(''),
    /**
     * videoConfKind is nullable reference
     */
    videoConfKind,
  };
};
