import { DateTimeOperationEnum, query, StringOperationEnum } from '@src/gql-client';
import { EventReference, Filters, PeriodInfo } from '@src/pages/Events/model/types';
import { selectFields } from 'gqty';
import { parseEventReference } from '@src/pages/Events/model/mappers';

export const getPrevEventsInfo = (dateTime: string, eduPlanId?: string, participantId?: string) => {
  const resp = query.getEduPlanWebinars({
    filter: {
      ownerId: eduPlanId ? { operator: StringOperationEnum.EQUALS, value: eduPlanId } : undefined,
      endAt: { operator: DateTimeOperationEnum.LESS_OR_EQUAL, value: dateTime },
      participantId: participantId ? { operator: StringOperationEnum.EQUALS, value: participantId } : undefined,
    },
    pageIndex: 0,
    pageSize: 20,
  });
  return resp;
};

export const getCurrentEventsInfo = (dateTime: string, eduPlanId?: string, participantId?: string) => {
  const resp = selectFields(
    query.getEduPlanWebinars({
      filter: {
        ownerId: eduPlanId ? { operator: StringOperationEnum.EQUALS, value: eduPlanId } : undefined,
        endAt: { operator: DateTimeOperationEnum.GREATER_OR_EQUAL, value: dateTime },
        participantId: participantId ? { operator: StringOperationEnum.EQUALS, value: participantId } : undefined,
      },
      pageIndex: 0,
      pageSize: 20,
    }),
    ['count'],
  );
  return resp;
};

export const getEventKinds = () => {
  const resp = query.getEduPlanEventKinds;
  const kindsArray: EventReference[] = resp?.map(parseEventReference) ?? [];
  return kindsArray;
};

export const getInitFiltersQuery = (params: Filters, dateTime: string) => {
  const prevEvents = getPrevEventsInfo(dateTime, params.eduPlanId, params.participantId);
  const currentEvents = getCurrentEventsInfo(dateTime, params.eduPlanId, params.participantId);
  const eventKinds = getEventKinds();
  if (!currentEvents || !prevEvents || !eventKinds) throw new Error('Не удалось получить информацию о странице');

  const past: PeriodInfo = params.tabs.find((e) => e.id === 'past') as PeriodInfo;
  const current: PeriodInfo = params.tabs.find((e) => e.id === 'current') as PeriodInfo;
  return {
    ...params,
    kinds: [...params.kinds, ...eventKinds],
    tabs: [
      { ...current, count: currentEvents?.count ?? 0 },
      { ...past, count: prevEvents?.count ?? 0 },
    ],
  };
};
