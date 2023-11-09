import { GetInitParticipantInfo, Participant } from '@src/pages/Events/model/types';
import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { participantStatusInfo } from '@src/pages/Events/model/constants';

export const getInviteParticipantListQuery = ({ eventId }: GetInitParticipantInfo): Participant[] => {
  const resp = query.getEduPlanParticipantsToInvite({
    eventId,
    pageIndex: 0,
    pageSize: 1000,
  });
  return (
    resp?.entities?.map(castNotSkeletonDeep).map((e) => {
      return {
        id: e?.id ?? '',
        fullName: `${e?.person?.identityCard?.lastName ?? ''} ${e?.person?.identityCard?.firstName ?? ''} ${
          e?.person?.identityCard?.middleName ?? ''
        }`,
        role: participantStatusInfo,
        email: e?.person?.user?.email ?? '',
        course: e?.student?.courseId ?? '',
        group: e?.student?.group?.title ?? '',
      };
    }) ?? []
  );
};
