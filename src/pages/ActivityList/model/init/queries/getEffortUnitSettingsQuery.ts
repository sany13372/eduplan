import { query } from '@src/gql-client';
import { EffortUnit } from '@src/pages/ActivityList/model/types';
import { selectFields } from 'gqty';

export const getEffortUnitSettingsQuery = (eduPlanId: string): EffortUnit => {
  const eduPlan = query.readEduPlan({ id: eduPlanId });
  if (!eduPlan) throw new Error('Не удалось найти план обучения');
  const {
    academicHourDurationSetting,
    doAccountHoursInCreditUnits,
    academicHoursInCreditUnitAmount,
    doAccountHoursInAcademicHours,
  } = selectFields(eduPlan, [
    'academicHourDurationSetting.academicHourDuration.minutesAmount',
    'doAccountHoursInCreditUnits',
    'academicHoursInCreditUnitAmount',
    'doAccountHoursInAcademicHours',
  ]);
  return !doAccountHoursInAcademicHours
    ? {
        unit: 'hours_and_minutes',
      }
    : {
        unit: 'academic_hours',
        minutesInAcademicHour: academicHourDurationSetting?.academicHourDuration?.minutesAmount ?? 60,
        doAccountHoursInCreditUnits: !!doAccountHoursInCreditUnits,
        academicHoursInCreditUnitAmount: academicHoursInCreditUnitAmount ?? 1,
      };
};
