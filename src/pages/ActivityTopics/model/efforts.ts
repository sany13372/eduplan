import { WorkKind, RawEffort, LessonKind, EffortUnit, EffortLookup } from './types';

export const EffortKey = {
  total: `eff-total`,
  totalWorkKind: (workKindId: string) => `eff-wk-${workKindId}`,
  lessonKind: (lessonKindId: string) => `eff-lk-${lessonKindId}`,
} as const;

const sum = (items: number[]) => items.reduce((acc, item) => acc + item, 0);

const totalEffort = (efforts: RawEffort[]) => sum(efforts.map((e) => e.minutesAmount));

const lessonKindEffort = (efforts: RawEffort[], lessonKind: LessonKind) =>
  efforts.find((e) => e.lessonKindId === lessonKind.id)?.minutesAmount ?? 0;

const totalWorkKindEffort = (efforts: RawEffort[], workKind: WorkKind) =>
  sum(workKind.lessonKinds.map((lk) => lessonKindEffort(efforts, lk)));

export const normalizeEffortsInMinutes = (efforts: RawEffort[], workKinds: WorkKind[]): EffortLookup => {
  const lookup: EffortLookup = {};

  workKinds
    .flatMap((wk) => wk.lessonKinds)
    .forEach((lessonKind) => {
      lookup[EffortKey.lessonKind(lessonKind.id)] = lessonKindEffort(efforts, lessonKind);
    });

  return lookup;
};

export const normalizeAndTotalEffortsInMinutes = (efforts: RawEffort[], workKinds: WorkKind[]): EffortLookup => {
  const lookup = normalizeEffortsInMinutes(efforts, workKinds);

  lookup[EffortKey.total] = totalEffort(efforts);

  workKinds.forEach((workKind) => {
    lookup[EffortKey.totalWorkKind(workKind.id)] = totalWorkKindEffort(efforts, workKind);
  });

  return lookup;
};

export const convertToRawEfforts = (efforts: EffortLookup, workKinds: WorkKind[]): RawEffort[] => {
  const list: RawEffort[] = [];

  workKinds
    .flatMap((wk) => wk.lessonKinds)
    .forEach((lessonKind) => {
      list.push({
        lessonKindId: lessonKind.id,
        minutesAmount: efforts[EffortKey.lessonKind(lessonKind.id)] ?? 0,
      });
    });

  return list;
};

export const formatEffortInHoursAndMinutes = (effortInMinutes: number): string => {
  const pad2 = (num: number) => {
    const text = num.toString();
    return text.length < 2 ? `0${text}` : text;
  };

  const hours = Math.floor(effortInMinutes / 60);
  const minutes = effortInMinutes % 60;

  return `${pad2(hours)}:${pad2(minutes)}`;
};

export const parseEffortInHoursAndMinutes = (text: string): number => {
  const [hoursText, minutesText] = (text || '').split(':');

  const hours = Number(hoursText);
  const hoursValid = !Number.isNaN(hours) && hours >= 0;

  const minutes = Number(minutesText);
  const minutesValid = !Number.isNaN(minutes) && minutes >= 0;

  const totalMinutes = (hoursValid ? hours : 0) * 60 + (minutesValid ? minutes : 0);
  return totalMinutes;
};

export const formatEffortInAcademicHours = (effortInMinutes: number, minutesInAcademicHour: number): string => {
  const round2 = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

  const hours = effortInMinutes / minutesInAcademicHour;
  return round2(hours).toString();
};

export const parseEffortInAcademicHours = (text: string, minutesInAcademicHour: number): number => {
  const hours = Number.parseFloat(text);
  if (Number.isNaN(hours) || hours < 0) {
    return 0;
  }

  return Math.floor(hours * minutesInAcademicHour);
};

export const formatEffort = (effortInMinutes: number, unit: EffortUnit): string => {
  if (effortInMinutes === 0) {
    return '';
  }

  if (unit.unit === 'academic_hours') {
    return formatEffortInAcademicHours(effortInMinutes, unit.minutesInAcademicHour);
  }
  return formatEffortInHoursAndMinutes(effortInMinutes);
};
