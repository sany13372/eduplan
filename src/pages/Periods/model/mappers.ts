import { EduGridElementItemPeriodType, Maybe } from '@src/gql-client';
import { Period } from '@src/pages/Periods/model/types';
import { parseISO } from 'date-fns';

export const mapRawPeriodInfoToPeriod = (
  raw: Maybe<EduGridElementItemPeriodType>,
  eduGridElementId: string,
): Period => {
  return {
    id: raw?.id ?? '',
    title: raw?.title ?? '',
    eduGridElementId,

    dates: {
      start: parseISO(raw?.beginDate ?? ''),
      end: parseISO(raw?.endDate ?? ''),
    },
    periodKind: {
      id: raw?.periodKind?.id ?? '',
      caption: raw?.periodKind?.title ?? '',
    },
  };
};
