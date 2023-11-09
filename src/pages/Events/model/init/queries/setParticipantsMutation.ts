import { mutation } from '@src/gql-client';
import { EventParticipantsInfo } from '@src/pages/Events/model/types';

export const setParticipantsMutation = ({ participants, id }: EventParticipantsInfo): string => {
  const resp = mutation.setEduPlanParticipants({
    EventParticipantDTO: {
      eventId: id,
      participants: participants.map((e) => ({ participantId: e.id, isOrganizer: e.role.id === 'organizer' })),
    },
  });

  return resp?.eventId ?? '';
};
