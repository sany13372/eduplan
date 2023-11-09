import {
  CommonInfo,
  CompetitionPeriod,
  EduForm,
  EduPlanListInfo,
  EduPlanListState,
  EduStartDate,
  EduTechnology,
  EnrollmentYear,
} from '@src/pages/EduPlansList/model/types';

export const defaultEduPlanListInfo: EduPlanListInfo = {
  items: [],
  totalItemCount: 0,
};

export const defaultEduPlanListState: EduPlanListState = {
  pageIndex: 0,
  pageSize: 10,
  globalFilter: undefined,
};
export const addEduKind = 'add';
export const proEduKind = 'pro';

const defaultObj: CommonInfo = { id: 'all', caption: 'Все' };
const defaultEmptyObj: CommonInfo = { id: 'empty', caption: 'Не установлено' };
export const defaultEduForm: EduForm = defaultObj;
export const defaultEduTechnology: EduTechnology = defaultObj;
export const defaultCompetitionPeriod: CompetitionPeriod = defaultObj;
export const defaultEnrollmentYear: EnrollmentYear = defaultObj;
export const emptyEnrollmentYear: EnrollmentYear = defaultEmptyObj;
export const defaultEnrollmentYearList: EnrollmentYear[] = [defaultEnrollmentYear, emptyEnrollmentYear];

export const defaultEduStartDate: EduStartDate = defaultObj;
export const emptyEduStartDate: EduStartDate = defaultEmptyObj;
export const defaultEduStartDateList: EduStartDate[] = [defaultEduStartDate, emptyEduStartDate];
