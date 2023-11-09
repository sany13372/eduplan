import { mutation } from '@src/gql-client';
import { EduPlanInfo } from '@src/pages/EduPlans/model/types';
import { localDateToServerDateString } from '@utils/date';

export const updateEduPlanMutation = (data: EduPlanInfo): string => {
  const resp = mutation.setEduPlan({
    id: data.id,
    eduPlan: {
      title: data.title,
      shortTitle: data.shortTitle,
      academicHoursInCreditUnitAmount:
        data.academicHoursInCreditUnitAmount &&
        Number.isInteger(Number.parseInt(data.academicHoursInCreditUnitAmount, 10))
          ? Number.parseInt(data.academicHoursInCreditUnitAmount, 10)
          : undefined,
      academicHoursInLessonAmount:
        data.academicHoursInLessonAmount && Number.isInteger(Number.parseInt(data.academicHoursInLessonAmount, 10))
          ? Number.parseInt(data.academicHoursInLessonAmount, 10)
          : undefined,
      completionPeriodId: data.competitionPeriod?.id as string,
      doAccountHoursInAcademicHours: data.doAccountHoursInAcademicHours,
      doAccountHoursInCreditUnits: data.doAccountHoursInCreditUnits,
      doAccountLessonDuration: data.doAccountLessonDuration,
      eduFormId: data.eduForm?.id as string,
      eduGridId: data.eduGrid?.id as string,
      eduProgram: {
        id: data.eduProgramInfo.id,
      },
      // eduStartDate: data.eduStartDate?.toLocaleDateString(),
      eduStartDate: data.eduStartDate ? localDateToServerDateString(data.eduStartDate) : null,
      enrollmentYear:
        data.enrollmentYear && Number.isInteger(Number.parseInt(data.enrollmentYear, 10))
          ? Number.parseInt(data.enrollmentYear, 10)
          : undefined,
      eduTechnologyId: data.eduTechnology?.id as string,
      academicHourDurationId: data.academicHourDuration?.id as string,
    },
  });

  return resp?.id ?? '';
};
