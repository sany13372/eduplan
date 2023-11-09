import { Reference } from '@src/types';

export type Period = {
  id: string;
  title: string;
  eduGridElementId: string;
  periodKind: Reference;
  dates: Dates;
};

export type Dates = {
  start: Date;
  end: Date;
};

export type NewPeriod = Partial<Omit<Period, 'dates'>> & { dates: Partial<Dates> };
