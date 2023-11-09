import { ReactText } from 'react';
import { Pagination, Teacher } from '@src/types';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

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

export type CommonInfoExtended = CommonInfo & { shortTitle: string };

export type EduForm = CommonInfoExtended;
export type EduTechnology = CommonInfoExtended;
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

export type EduPlanInfo = {
  id: string;
  title: string;
  shortTitle: string;
  eduForm: EduForm;
  eduTechnology: EduTechnology;
  competitionPeriod: CompetitionPeriod;
  eduGrid: EduGrid;
  eduProgramInfo: EduProgramInfo;
  spaceInfo: EduSpaceInfo;
  enrollmentYear?: string;
  eduStartDate?: string;
  doAccountHoursInAcademicHours?: boolean;
  academicHourDuration?: AcademicHourDuration;
  doAccountLessonDuration?: boolean;
  academicHoursInLessonAmount?: string;
  doAccountHoursInCreditUnits?: boolean;
  academicHoursInCreditUnitAmount?: string;
  description?: string;
};

export type EduProgramInfo = {
  id: string;
  title: string;
  eduProgramKind: EduProgramKind;
  eduKindSystemCode: string;
  domainOfStudy: DomainOfStudy;
};

export type EduSpaceInfo = {
  id: string;
  title: string;
};

export type AddEduPlanInfo = RequiredBy<Partial<EduPlanInfo>, 'eduProgramInfo'>;

export type UsersData = Pagination<{
  teachers: Teacher[];
}>;

export type GetUsersDataParams = UsersData & { planId: string };
