import { castNotSkeletonDeep } from 'gqty';
import { query } from '@src/gql-client';
import { EffortUnit } from '@src/pages/ActivityTopics/model/types';

export const getEffortUnitSettingsQuery = (activityId: string): EffortUnit => {
  const settings = query
    .readEduPlanRows({
      where: {
        id: { _eq: activityId },
        deletedAt: { _is_null: true },
      },
    })
    .map(castNotSkeletonDeep)
    .map((row) => row.eduPlan)
    .map((plan) => ({
      useAcademicHours: plan?.doAccountHoursInAcademicHours ?? false,
      academincHourDurationInMinutes: plan?.academicHourDurationSetting?.academicHourDuration?.minutesAmount ?? 60,
    }));

  const setting = settings[0];
  if (setting && setting.useAcademicHours) {
    return {
      unit: 'academic_hours',
      minutesInAcademicHour: setting.academincHourDurationInMinutes,
    };
  }
  return {
    unit: 'hours_and_minutes',
  };
};
