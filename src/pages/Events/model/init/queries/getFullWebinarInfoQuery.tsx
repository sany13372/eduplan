import { query, StringOperationEnum } from '@src/gql-client';
import { eventReferenceFromId } from '@src/pages/Events/model/mappers';

export const getFullWebinarInfoQuery = (id: string) => {
  const resp = query.getEduPlanWebinars({
    filter: {
      ids: { operator: StringOperationEnum.EQUALS, value: id },
    },
  });
  const webinars = resp?.webinars;
  if (!webinars || webinars.length === 0) throw new Error('Не удалось получить информацию о странице');
  const webinar = webinars[0];
  return {
    id: webinar?.id ?? '',
    title: webinar?.title ?? '',
    kind: eventReferenceFromId(webinar?.kindId),
    endDate: webinar?.endAt ?? undefined,
    startDate: webinar?.startAt ?? undefined,
    authorId: webinar?.authorId ?? '',
    ownerId: webinar?.ownerId ?? '',
    description: webinar?.description ?? '',
    format: eventReferenceFromId(webinar?.formatId),
    isPublished: Boolean(webinar?.isPublished),
    link: webinar?.link ?? '',
    place: webinar?.place ?? '',
    participantCount: webinar?.participantsCount ?? 0,
    videoConfKind: eventReferenceFromId(webinar?.videoConfKindId),
  };
};
