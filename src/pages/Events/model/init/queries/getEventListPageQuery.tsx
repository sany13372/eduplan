import {
  DateTimeOperationEnum,
  Maybe,
  query,
  QueryOrderEnum,
  QueryOrderInput,
  StringOperationEnum,
} from '@src/gql-client';
import { EventListInfo, Filters, GetEventListParams } from '@src/pages/Events/model/types';
import { dateToEventsDateString } from '@utils/date';
import { eventReferenceFromId } from '@src/pages/Events/model/mappers';

const getOwnerCriteria = (filters: Filters) => {
  const { eduPlanId } = filters;
  return eduPlanId ? { operator: StringOperationEnum.EQUALS, value: eduPlanId } : undefined;
};

const getParticipantCriteria = (filters: Filters) => {
  const { participantId } = filters;
  return participantId
    ? { operator: StringOperationEnum.IN, value: participantId, values: [participantId] }
    : undefined;
};

const getEndAtCriteria = (filters: Filters) => {
  const { tabs } = filters;
  const dateTime = dateToEventsDateString(new Date(new Date().toDateString()));
  const activeTab = tabs.find((e) => e.isSelected);
  if (!activeTab) return undefined;
  const isPast = activeTab.id === 'past';
  return {
    operator: isPast ? DateTimeOperationEnum.LESS_OR_EQUAL : DateTimeOperationEnum.GREATER_THAN,
    value: dateTime,
  };
};

const getStartAtOrderCriteria = (filters: Filters): Maybe<QueryOrderInput> => {
  const { tabs } = filters;
  const activeTab = tabs.find((e) => e.isSelected);
  if (!activeTab) return null;
  const isPast = activeTab.id === 'past';
  return {
    field: 'startAt',
    order: isPast ? QueryOrderEnum.DESC : QueryOrderEnum.ASC,
  };
};

const getTitleOrderCriteria = (): Maybe<QueryOrderInput> => {
  return {
    field: 'title',
    order: QueryOrderEnum.ASC,
  };
};

export const getEventListPageQuery = ({
  filters,
  pagination: { pageSize, pageIndex, count },
}: GetEventListParams): EventListInfo => {
  const resp = query.getEduPlanWebinars({
    filter: {
      ownerId: getOwnerCriteria(filters),
      endAt: getEndAtCriteria(filters),
      participantId: getParticipantCriteria(filters),
    },
    orderBy: [getStartAtOrderCriteria(filters), getTitleOrderCriteria()],
    pageIndex,
    pageSize,
  });
  if (!resp) throw new Error('Не удалось получить информацию о странице');
  return {
    data:
      resp.webinars?.map((webinar) => {
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
        };
      }) ?? [],
    pagination: {
      count: resp.count ?? count,
      pageIndex: (resp?.pageIndex ?? pageIndex) + 1,
      pageSize: resp?.pageSize ?? pageSize,
    },
  };
};
