import { Participant } from '@src/pages/Events/model/types';
import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { organizerStatusInfo, participantStatusInfo } from '@src/pages/Events/model/constants';

export const getEventParticipantListQuery = (id: string): Participant[] => {
  const resp = query.getEduPlanParticipants({
    eventId: id,
    pageSize: 1000,
    pageIndex: 0,
  });
  return (
    resp?.entities?.map(castNotSkeletonDeep).map((e) => {
      return {
        id: e?.participantId ?? '',
        fullName: `${e?.personRoleType?.person?.identityCard?.lastName ?? ''} ${
          e?.personRoleType?.person?.identityCard?.firstName ?? ''
        } ${e?.personRoleType?.person?.identityCard?.middleName ?? ''}`,
        role: e?.isOrganizer ? organizerStatusInfo : participantStatusInfo,
        email: e?.personRoleType?.person?.user?.email ?? '',
        course: e?.personRoleType?.student?.courseId ?? '',
        group: e?.personRoleType?.student?.group?.title ?? '',
      };
    }) ?? []
  );
};
