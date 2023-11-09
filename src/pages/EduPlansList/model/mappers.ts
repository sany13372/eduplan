import { EduPlanShortInfo } from '@src/pages/EduPlansList/model/types';
import { EduPlanType } from '@src/gql-client';

export const eduPlanTypeToEduPlanShortInfo = ({
  id,
  eduForm,
  completionPeriod,
  eduTechnology,
  title,
  eduStartDate,
  enrollmentYear,
}: EduPlanType): EduPlanShortInfo => {
  return {
    id: id ?? '',
    competitionPeriod: {
      id: completionPeriod?.id ?? '',
      caption: completionPeriod?.title ?? '',
    },
    eduForm: {
      id: eduForm?.id ?? '',
      caption: eduForm?.title ?? '',
    },
    eduTechnology: {
      id: eduTechnology?.id ?? '',
      caption: eduTechnology?.title ?? '',
    },
    title: title ?? '',
    enrollmentYear: enrollmentYear ?? null,
    eduStartDate: eduStartDate ? new Date(eduStartDate) : null,
  };
};
