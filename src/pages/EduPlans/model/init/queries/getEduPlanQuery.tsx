import { EduPlanInfo } from '@src/pages/EduPlans/model/types';
import { query } from '@src/gql-client';
import { format } from 'date-fns';

export const getEduPlanQuery = (id: string): EduPlanInfo | null => {
  const respArr = query.readEduPlans({
    where: {
      id: { _eq: id },
      deletedAt: { _is_null: true },
    },
  });
  if (!respArr || respArr.length === 0) return null;

  const resp = respArr[0];
  return {
    id: resp?.id ?? '',
    title: resp?.title ?? '',
    shortTitle: resp?.shortTitle ?? '',
    eduForm: {
      id: resp?.eduFormSetting?.eduForm?.id ?? '',
      caption: resp?.eduFormSetting?.eduForm?.title ?? '',
      shortTitle: resp?.eduFormSetting?.eduForm?.shortTitle ?? '',
    },
    eduTechnology: {
      id: resp?.eduTechnologySetting?.eduTechnology?.id ?? '',
      caption: resp?.eduTechnologySetting?.eduTechnology?.title ?? '',
      shortTitle: resp?.eduTechnologySetting?.eduTechnology?.shortTitle ?? '',
    },
    competitionPeriod: {
      id: resp?.completionPeriodSetting?.completionPeriod?.id ?? '',
      caption: resp?.completionPeriodSetting?.completionPeriod?.title ?? '',
    },
    eduGrid: {
      id: resp?.eduGridSetting?.eduGrid?.id ?? '',
      caption: resp?.eduGridSetting?.eduGrid?.title ?? '',
      completionPeriodId: resp?.eduGridSetting?.eduGrid?.completionPeriodId ?? '',
    },
    eduProgramInfo: {
      id: resp.eduProgram?.id ?? '',
      title: resp.eduProgram?.title ?? '',
      eduKindSystemCode: resp?.eduProgram?.eduLevelSetting?.eduLevel?.eduKind?.systemCode ?? '',
      eduProgramKind: {
        id: resp.eduProgram?.eduProgramKindSetting?.eduProgramKind?.id ?? '',
        caption: resp.eduProgram?.eduProgramKindSetting?.eduProgramKind?.title ?? '',
      },
      domainOfStudy: {
        id: resp.eduProgram?.domainOfStudySetting?.domainOfStudy?.id ?? '',
        caption: resp.eduProgram?.domainOfStudySetting?.domainOfStudy?.title ?? '',
        systemCode: resp.eduProgram?.domainOfStudySetting?.domainOfStudy?.systemCode ?? '',
      },
    },
    enrollmentYear: resp?.enrollmentYear ? `${resp?.enrollmentYear}` : '',
    eduStartDate: resp.eduStartDate ? format(new Date(resp.eduStartDate), 'ddMMyyyy') : '',
    doAccountHoursInAcademicHours: resp.doAccountHoursInAcademicHours ?? false,
    academicHourDuration: resp.academicHourDurationSetting?.academicHourDuration
      ? {
          id: resp.academicHourDurationSetting.academicHourDuration.id ?? '',
          caption: resp.academicHourDurationSetting.academicHourDuration.title ?? '',
        }
      : undefined,
    spaceInfo: {
      id: resp?.space?.id ?? '',
      title: resp?.space?.title ?? '',
    },
    doAccountLessonDuration: resp.doAccountLessonDuration ?? false,
    academicHoursInLessonAmount: resp.academicHoursInLessonAmount ? resp.academicHoursInLessonAmount.toString(10) : '2',
    doAccountHoursInCreditUnits: resp.doAccountHoursInCreditUnits ?? false,
    academicHoursInCreditUnitAmount: resp.academicHoursInCreditUnitAmount
      ? resp.academicHoursInCreditUnitAmount.toString(10)
      : '36',
  };
};
