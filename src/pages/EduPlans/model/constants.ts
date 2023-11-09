import {
  CommonInfo,
  CommonInfoExtended,
  CompetitionPeriod,
  EduForm,
  EduPlanListInfo,
  EduPlanListState,
  EduStartDate,
  EduTechnology,
  EnrollmentYear,
  UsersData,
} from '@src/pages/EduPlans/model/types';
import { defaultPaginationValue } from '@constants/pagination';

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
const defaultObjExtended: CommonInfoExtended = { id: 'all', caption: 'Все', shortTitle: '' };
const defaultEmptyObj: CommonInfo = { id: 'empty', caption: 'Не установлено' };
export const defaultEduForm: EduForm = defaultObjExtended;
export const defaultEduTechnology: EduTechnology = defaultObjExtended;
export const defaultCompetitionPeriod: CompetitionPeriod = defaultObj;
export const defaultEnrollmentYear: EnrollmentYear = defaultObj;
export const emptyEnrollmentYear: EnrollmentYear = defaultEmptyObj;
export const defaultEnrollmentYearList: EnrollmentYear[] = [defaultEnrollmentYear, emptyEnrollmentYear];

export const defaultEduStartDate: EduStartDate = defaultObj;
export const emptyEduStartDate: EduStartDate = defaultEmptyObj;
export const defaultEduStartDateList: EduStartDate[] = [defaultEduStartDate, emptyEduStartDate];

export const defaultAdmin = 'Не указано';

export const defaultUsersData: UsersData = {
  teachers: [],
  pagination: defaultPaginationValue,
};
