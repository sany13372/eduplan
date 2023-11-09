import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { eventInfo, eventParticipantStore, resetDomainData } from '@src/pages/Events/model';
import {
  getFullWebinarInfoQuery,
  getEventParticipantListQuery,
  getWebinarReferences,
  getCourseInfoList,
  getPersonalLink,
  getEduPlanWebinarRecordLinkQuery,
} from '@src/pages/Events/model/init/queries';

import { isVideoConfWebinarLink } from '../utils';

connectGetActionNodes({
  nodes: eventInfo,
  handler: async (id) => {
    const webinar = await resolved(() => getFullWebinarInfoQuery(id), { noCache: true });
    const references = await resolved(
      () =>
        getWebinarReferences({
          kindId: webinar.kind.id,
          formatId: webinar.format.id,
          videoConfKindId: webinar.videoConfKind.id,
        }),
      { noCache: true },
    );
    const webinarLink = await resolved(() => getEduPlanWebinarRecordLinkQuery(id), { noCache: true });

    let personalLink: string | undefined;

    if (references.videoConfKind && isVideoConfWebinarLink(references.videoConfKind)) {
      personalLink = await resolved(() => getPersonalLink({ eventId: id }), { noCache: true });
    }

    return {
      ...webinar,
      webinarLink:webinarLink || null,
      kind: references.kind,
      format: references.format,
      videoConfKind: references.videoConfKind,
      ...(personalLink ? { link: personalLink } : {}),
    };
  },
  resetOn: [resetDomainData],
});

connectGetActionNodes({
  nodes: eventParticipantStore,
  handler: async (id) => {
    const resp = await resolved(() => getEventParticipantListQuery(id), { noCache: true });
    const courseIdList: string[] = Array.from(new Set(resp.map((e) => e.course ?? '').filter((e) => e.length > 0)));
    const courseInfo = await resolved(() => getCourseInfoList(courseIdList), { noCache: true });
    return resp.map((e) => ({
      ...e,
      course: courseInfo[e.course ?? ''] ?? '',
    }));
  },
  resetOn: [resetDomainData],
});
