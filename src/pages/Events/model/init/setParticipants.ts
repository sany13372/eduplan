import { connectAddActionNodes, connectGetActionNodes } from '@utils/effector';
import {
  addParticipant,
  initParticipantDataStore,
  removeParticipants,
  resetDomainData,
  setEventParticipants,
} from '@src/pages/Events/model/index';
import { resolved } from '@src/gql-client';
import {
  setParticipantsMutation,
  getInviteParticipantListQuery,
  getCourseInfoList,
} from '@src/pages/Events/model/init/queries';
import { EventParticipantsInfo } from '@src/pages/Events/model/types';

connectGetActionNodes({
  nodes: initParticipantDataStore,
  handler: async (params) => {
    const resp = await resolved(() => getInviteParticipantListQuery(params), { noCache: true });
    const courseIdList: string[] = Array.from(new Set(resp.map((e) => e.course ?? '').filter((e) => e.length > 0)));
    const courseInfo = await resolved(() => getCourseInfoList(courseIdList), { noCache: true });
    return resp.map((e) => ({
      ...e,
      course: courseInfo[e.course ?? ''] ?? '',
    }));
  },
  resetOn: [resetDomainData],
});

initParticipantDataStore.$value
  .on(addParticipant, (state, val) => {
    if (state) return [...state, val];
    return [val];
  })
  .on(removeParticipants, (state, val) => {
    const idList = val.map((e) => e.id);
    if (!state) return state;
    return state.filter((e) => !idList.includes(e.id));
  });

connectAddActionNodes<EventParticipantsInfo>({
  nodes: setEventParticipants,
  handler: async (eventData) => {
    const resp = await resolved(() => setParticipantsMutation(eventData), { noCache: true });
    if (!resp) throw new Error('Не удалось добавить участников');
    return resp;
  },
  convertErrors: () => ({}),
  resetOn: [resetDomainData],
  resetErrorsOn: [resetDomainData],
});

setEventParticipants.$status.reset(resetDomainData);
