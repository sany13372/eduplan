import { mutation } from '@src/gql-client';
import { NewPeriod } from '@src/pages/Periods/model/types';
import { formatISO } from 'date-fns';

export const createPeriodMutation = ({
  eduGridElementId,
  title,
  periodKind,
  dates: { end, start },
}: NewPeriod): string => {
  const resp = mutation.addEduPlanGridElementPeriod({
    eduPlanGridPeriodInput: {
      eduGridItemId: eduGridElementId ?? '',
      title: title?.trim() ?? '',
      periodKindId: periodKind?.id ?? '',
      beginDate: start ? formatISO(start, { representation: 'date' }) : '',
      endDate: end ? formatISO(end, { representation: 'date' }) : '',
    },
  });
  return resp?.id ?? '';
};
