import { connectAddActionNodes, connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { setEvent, resetDomainData, initDataStore } from '@src/pages/Events/model';
import { SetEventInfo } from '@src/pages/Events/model/types';
import {
  createEventMutation,
  getFullWebinarInfoQuery,
  getWebinarReferences,
} from '@src/pages/Events/model/init/queries';
import { ValidationErrors } from '@src/utils/validation';
import { formatErrorMessagesByPath, getErrorCodes } from '@src/utils/api';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';

const formatCreateUpdateTemplateErrorMessage = () => undefined;

export const convertCreateUpdateTemplateError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateTemplateErrorMessage);

connectAddActionNodes<SetEventInfo>({
  nodes: setEvent,
  handler: async (eventData) => {
    const resp = await resolved(() => createEventMutation(eventData), { noCache: true });
    if (!resp) throw new Error('Не удалось создать событие');
    return resp;
  },
  convertErrors: () => ({}),
  resetOn: [resetDomainData],
  resetErrorsOn: [resetDomainData],
});

connectGetActionNodes({
  nodes: initDataStore,
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
    return {
      ...webinar,
      kind: references.kind,
      format: references.format,
      videoConfKind: references.videoConfKind,
      date: format(parseISO(webinar?.startDate ?? ''), 'ddMMyyyy'),
      startTime: format(parseISO(webinar?.startDate ?? ''), 'HHmm'),
      endTime: format(parseISO(webinar?.endDate ?? ''), 'HHmm'),
    };
  },
  resetOn: [resetDomainData],
});
