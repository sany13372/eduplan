import { Participant } from '@src/pages/Events/model/types';
import { organizerStatusInfo } from '@src/pages/Events/model/constants';

type PrepareInitParticipantListParams = {
  authorId: string;
  participantList: Participant[];
};
export const prepareInitParticipantList = ({
  authorId,
  participantList,
}: PrepareInitParticipantListParams): Participant[] => {
  return participantList.filter((e) => e.id === authorId).map((e) => ({ ...e, role: organizerStatusInfo }));
};
