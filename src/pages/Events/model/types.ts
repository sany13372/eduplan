export type BaseEventInfo = {
  id: string;
  title: string;
  description: string;
  link?: string;
  place?: string;
  authorId?: string;
  ownerId: string;
};

export type ViewEventInfo = {
  format: EventReference;
  kind: EventReference;
  isPublished: boolean;
  startDate?: string;
  endDate?: string;
  participantCount: number;
  videoConfKind?: EventReference;
  webinarLink?: string | null;
} & BaseEventInfo;

export type SetEventInfo = {
  date: string;
  startTime: string;
  endTime: string;
  format?: EventReference;
  kind?: EventReference;
  videoConfKind?: EventReference;
} & BaseEventInfo;

export type GetEventListParams = { filters: Filters; pagination: PaginationInfo };
export type PublicateEventParams = { id: string; isPublished: boolean };

export type EventListInfo = {
  data: ViewEventInfo[];
  pagination: PaginationInfo;
};

export type PaginationInfo = {
  pageSize: number;
  pageIndex: number;
  count: number;
};

export type EventReference = {
  id: string;
  caption: string;
  systemCode: string;
  isSelected: boolean;
};

type KindType = 'past' | 'current';
export type PeriodInfo = { id: KindType; isSelected: boolean; count: number; label: string };
export type Filters = {
  kinds: EventReference[];
  tabs: PeriodInfo[];
  eduPlanId?: string;
  participantId?: string;
};

export type Participant = {
  id: string;
  fullName: string;
  role: ParticipantStatusInfo;
  email?: string;
  course?: string;
  group?: string;
};

export type EventParticipantsInfo = {
  id: string;
  participants: Participant[];
};

export type ParticipantStatus = 'organizer' | 'participant';

export type ParticipantStatusInfo = {
  id: ParticipantStatus;
  caption: string;
};

export type GetInitParticipantInfo = {
  eventId: string;
  ownerId: string;
};

export type DeleteEventParams = {
  id: string;
  isSilently?: boolean;
};

export type GetInitFilters = {
  eduplanId?: string;
  participantId?: string;
  tab: KindType;
};

export type GetPersonalLinkParams = {
  eventId: string;
};
