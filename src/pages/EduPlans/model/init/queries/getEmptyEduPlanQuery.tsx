import { AddEduPlanInfo } from '@src/pages/EduPlans/model/types';
import { query } from '@src/gql-client';

export const getEmptyEduPlanQuery = (progId: string): AddEduPlanInfo | null => {
  const resp = query.readEduProgram({
    id: progId,
  });
  if (!resp) return null;
  return {
    id: undefined,
    title: undefined,
    shortTitle: undefined,
    eduForm: undefined,
    eduTechnology: undefined,
    competitionPeriod: undefined,
    eduGrid: undefined,
    eduProgramInfo: {
      id: resp?.id ?? '',
      title: resp?.title ?? '',
      eduKindSystemCode: resp?.eduLevelSetting?.eduLevel?.eduKind?.systemCode ?? '',
      eduProgramKind: {
        id: resp?.eduProgramKindSetting?.eduProgramKind?.id ?? '',
        caption: resp?.eduProgramKindSetting?.eduProgramKind?.title ?? '',
      },
      domainOfStudy: {
        id: resp?.domainOfStudySetting?.domainOfStudy?.id ?? '',
        caption: resp?.domainOfStudySetting?.domainOfStudy?.title ?? '',
        systemCode: resp?.domainOfStudySetting?.domainOfStudy?.systemCode ?? '',
      },
    },
    spaceInfo: {
      id: resp?.space?.id ?? '',
      title: resp?.space?.title ?? '',
    },
    enrollmentYear: '',
    eduStartDate: '',
    doAccountHoursInAcademicHours: false,
    academicHourDuration: undefined,
    doAccountLessonDuration: false,
    academicHoursInLessonAmount: '2',
    doAccountHoursInCreditUnits: false,
    academicHoursInCreditUnitAmount: '36',
  };
};
