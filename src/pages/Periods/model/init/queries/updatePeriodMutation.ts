import { mutation } from '@src/gql-client';
import { Period } from '@src/pages/Periods/model/types';
import { formatISO } from 'date-fns';

export const updatePeriodMutation = ({
  id,
  eduGridElementId,
  title,
  periodKind,
  dates: { end, start },
}: Period): string => {
  const resp = mutation.editEduPlanGridElementPeriod({
    eduPlanGridPeriodInput: {
      id,
      eduGridItemId: eduGridElementId ?? '',
      title: title.trim() ?? '',
      periodKindId: periodKind?.id ?? '',
      beginDate: start ? formatISO(start, { representation: 'date' }) : '',
      endDate: end ? formatISO(end, { representation: 'date' }) : '',
    },
  });
  return resp?.id ?? '';
};
