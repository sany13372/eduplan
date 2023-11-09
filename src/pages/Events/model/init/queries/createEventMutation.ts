import { mutation } from '@src/gql-client';
import { SetEventInfo } from '@src/pages/Events/model/types';
import { localeToCreateEventDateString } from '@src/utils/date';

export const createEventMutation = (data: SetEventInfo): string => {
  const resp = mutation.setEduPlanWebinar({
    WebinarDTO: {
      id: data.id ? data.id : undefined,
      title: data.title.trim(),
      authorId: data.authorId ?? '',
      ownerId: data.ownerId,
      formatId: data.format?.id ?? '',
      link: ['online', 'mixed'].includes(data.format?.systemCode ?? '') ? data.link?.trim() : undefined,
      place: ['offline', 'mixed'].includes(data.format?.systemCode ?? '') ? data.place?.trim() : undefined,
      description: data.description.trim(),
      startAt: localeToCreateEventDateString(data.date + data.startTime),
      endAt: localeToCreateEventDateString(data.date + data.endTime),
      isPublished: false,
      videoConfKindId: data.videoConfKind?.id ?? undefined,
      kindId: data.kind?.id,
    },
  });

  return resp?.id ?? '';
};
