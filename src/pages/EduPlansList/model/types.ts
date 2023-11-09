import { ReactText } from 'react';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type OptionalVal<T> = T | undefined;

export type GlobalFilterParams = {
  title?: string;
  eduForm?: EduForm;
  eduTechnology?: EduTechnology;
  competitionPeriod?: CompetitionPeriod;
  enrollmentYear?: EnrollmentYear[];
  eduStartDate?: EduStartDateFilter;
};

export type EduStartDateFilter = { from?: EduStartDate; to?: EduStartDate };
export type EduPlanShortInfo = {
  id: string;
  title: string;
  eduForm: EduForm;
  eduTechnology: EduTechnology;
  competitionPeriod: CompetitionPeriod;
  enrollmentYear: number | null;
  eduStartDate: Date | null;
};

export type CommonInfo = {
  id: ReactText;
  caption: string;
};

export type EduForm = CommonInfo;
export type EduTechnology = CommonInfo;
export type CompetitionPeriod = CommonInfo;
export type EnrollmentYear = CommonInfo;
export type EduStartDate = CommonInfo;
export type EduProgramKind = CommonInfo;
export type AcademicHourDuration = CommonInfo;
export type DomainOfStudy = CommonInfo & { systemCode: string };
export type EduGrid = CommonInfo & { completionPeriodId: string };

export interface EduPlanListState {
  pageIndex: number;
  pageSize: number;
  globalFilter?: GlobalFilterParams;
}

export interface GetEduPlanListParams {
  state: EduPlanListState;
  eduProgId?: string;
}
export interface EduPlanListInfo {
  items: EduPlanShortInfo[];
  totalItemCount: number;
}
