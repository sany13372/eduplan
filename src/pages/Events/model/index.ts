import { createDomain } from 'effector';
import { status } from 'patronum';
import {
  SetEventInfo,
  EventListInfo,
  EventReference,
  Filters,
  GetEventListParams,
  PeriodInfo,
  PublicateEventParams,
  ViewEventInfo,
  GetInitParticipantInfo,
  EventParticipantsInfo,
  Participant,
  DeleteEventParams,
  GetInitFilters,
} from '@src/pages/Events/model/types';
import { defaultEventListInfo, defaultFilters } from '@src/pages/Events/model/constants';
import { createAddActionNodes, createGetActionNodes } from '@utils/effector';

export const EventManagementDomain = createDomain('EventManagementDomain');
export const resetDomainData = EventManagementDomain.createEvent();

export const $eventListInfo = EventManagementDomain.createStore<EventListInfo>(defaultEventListInfo);
export const getEventListPage = EventManagementDomain.createEvent();
export const getEventListPageFx = EventManagementDomain.createEffect<GetEventListParams, EventListInfo>();
export const $getEventListPageFxStatus = status({
  effect: getEventListPageFx,
}).reset(resetDomainData);

export const publicateEvent = EventManagementDomain.createEvent<PublicateEventParams>();
export const publicateEventFx = EventManagementDomain.createEffect<PublicateEventParams, boolean>();
export const $publicateEventFxStatus = status({
  effect: publicateEventFx,
}).reset(resetDomainData);

export const $deleteItemSelectedId = EventManagementDomain.createStore<string | null>(null);
export const setDeleteItem = EventManagementDomain.createEvent<string>();
export const resetDeleteItem = EventManagementDomain.createEvent();
export const deleteEvent = EventManagementDomain.createEvent<DeleteEventParams>();
export const deleteEventFx = EventManagementDomain.createEffect<DeleteEventParams, boolean>();
export const $deleteEventFxStatus = status({
  effect: publicateEventFx,
}).reset(resetDomainData);

export const $filters = EventManagementDomain.createStore<Filters>(defaultFilters);
export const decrimentCurrentTabCount = EventManagementDomain.createEvent();
export const getInitFilters = EventManagementDomain.createEvent<GetInitFilters>();
export const getInitFiltersFx = EventManagementDomain.createEffect<Filters, Filters>();
export const $getInitFiltersFxStatus = status({
  effect: getInitFiltersFx,
  defaultValue: 'pending',
}).reset(resetDomainData);
export const setKindFilter = EventManagementDomain.createEvent<EventReference>();
export const setDateFilter = EventManagementDomain.createEvent<PeriodInfo>();

export const eventInfo = createGetActionNodes<string, ViewEventInfo | null>(EventManagementDomain, null);
export const eventKindStore = createGetActionNodes<void, EventReference[]>(EventManagementDomain, []);
export const eventFormatStore = createGetActionNodes<void, EventReference[]>(EventManagementDomain, []);
export const eventVideoConfKindsStore = createGetActionNodes<void, EventReference[]>(EventManagementDomain, []);
export const setEvent = createAddActionNodes<SetEventInfo>(EventManagementDomain);

export const initDataStore = createGetActionNodes<string, SetEventInfo | null>(EventManagementDomain, null);

export const initParticipantDataStore = createGetActionNodes<GetInitParticipantInfo, Participant[] | null>(
  EventManagementDomain,
  null,
);
export const addParticipant = EventManagementDomain.createEvent<Participant>();
export const removeParticipants = EventManagementDomain.createEvent<Participant[]>();

export const setEventParticipants = createAddActionNodes<EventParticipantsInfo>(EventManagementDomain);
export const eventParticipantStore = createGetActionNodes<string, Participant[] | null>(EventManagementDomain, null);

export const $fullNameFilter = EventManagementDomain.createStore<string>('');
export const setFullNameFilter = EventManagementDomain.createEvent<string>();
