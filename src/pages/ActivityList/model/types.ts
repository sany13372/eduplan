import { ReactText } from 'react';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type CommonInfo = {
  id: ReactText;
  caption: string;
};

export type Category = CommonInfo;
export type ComponentKind = CommonInfo;

export type ShortActivityInfo = {
  id?: string;
  title: string;
  shortTitle: string;
  category?: Category;
  eduPlanId: string;
  eduGridElementId: string;
  path: string | null;
};

export type ShortActivityGroupInfo = {
  id?: string;
  title: string;
  shortTitle: string;
  eduPlanId: string;
  eduGridElementId: string;
  component?: ComponentKind;
};

export type EduGridElement = CommonInfo;

export type LessonKind = CommonInfo & {
  shortTitle: string;
};

export type WorkKind = CommonInfo & {
  shortTitle: string;
  lessonKinds: LessonKind[];
};

export type RawEffort = {
  workKindId: string;
  lessonKindId: string;
  minutesAmount: number;
};

export type EffortParams = Omit<RawEffort, 'minutesAmount'>;
export type EffortUnit =
  | { unit: 'hours_and_minutes' }
  | {
      unit: 'academic_hours';
      minutesInAcademicHour: number;
      doAccountHoursInCreditUnits: boolean;
      academicHoursInCreditUnitAmount: number;
    };

export type EffortLookup = {
  [key: string]: number;
};

export type EduGridItemDefault = {
  id: string;
  eduGridElementId: string;
  isGroup: boolean;
  activityId: ReactText;
  activityTitle: string;
  priority?: number | null;
  path: string;
  efforts: RawEffort[];
  isInvalid?: boolean;
};

export type EduGridItemEl = { isGroup: false } & EduGridItemDefault;
export type EduGridGroupEl = {
  isGroup: true;
  componentKind: string;
  childrens: EduGridItemEl[];
} & EduGridItemDefault;

export type EduGridItem = EduGridItemEl | EduGridGroupEl;
