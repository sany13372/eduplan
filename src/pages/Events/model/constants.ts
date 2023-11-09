import {
  EventListInfo,
  EventReference,
  Filters,
  Participant,
  ParticipantStatusInfo,
} from '@src/pages/Events/model/types';

export const defaultEventListInfo: EventListInfo = {
  data: [],
  pagination: { count: 50, pageIndex: 0, pageSize: 50 },
};

export const allKinds: EventReference = { id: 'all', caption: 'Все виды', isSelected: true, systemCode: 'all' };
export const defaultFilters: Filters = {
  kinds: [allKinds],
  tabs: [
    { label: 'Текущие', isSelected: true, count: 0, id: 'current' },
    { label: 'Прошедшие', isSelected: false, count: 0, id: 'past' },
  ],
};

export const defaultEventKind = 'webinar';
export const defaultEventFormat = 'online';

export const participantStatusInfo: ParticipantStatusInfo = {
  id: 'participant',
  caption: 'Участник',
};

export const organizerStatusInfo: ParticipantStatusInfo = {
  id: 'organizer',
  caption: 'Организатор',
};

export const userStatusList = [participantStatusInfo, organizerStatusInfo];

export const defaultParticipant: Participant = {
  id: 'fdsdfkljsjklcxv',
  fullName: 'Петров Василий Леопольдович',
  role: participantStatusInfo,
  email: 'petrovleo@mail.ru',
  course: '1  курс',
  group: '4242',
};
