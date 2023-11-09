import { PaginationInfo } from '@src/types';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type OptionalVal<T> = T | undefined;

export type Reference = {
  id: string;
  caption: string;
};

export type EduGroupType = Reference;

export type BaseGroupInfo = Partial<{
  id: string;
  title: string;
  groupType: EduGroupType;
  eduPlanId: string;
  spaceId: string;
}>;

export type GroupInfo = Reference;

export type CreateGroupInfo = PartialBy<Required<BaseGroupInfo>, 'id' | 'groupType'>;

export type UpdateGroupInfo = Required<BaseGroupInfo>;

export type ShortGroupInfo = Pick<Required<BaseGroupInfo>, 'id' | 'title'>;

export type ViewGroupInfo = ShortGroupInfo & {
  eduProgramTitle: string;
  eduPlanTitle: string;
  eduFormTitle: string;
  eduTechnologyTitle: string;
  completitionPeriodTitle: string;
  enrollmentYear?: number;
  eduStartDate?: Date;
  groupTypeTitle: string;
};

export interface GroupPageStudentInfo {
  id: string;
  fio: string;
  email: string;
  course: string;
  financingSource: string;
  personalNumber: string;
  bookNumber: string;
  group: string;
  groupId: string;
  shortTitleFinancingSource: string;
}

export interface GetStudentsParams {
  groupId: string;
  planId: string;
}

export enum ModalType {
  addStudent = 'addStudent',
  editStudent = 'editStudent',
  editGroup = 'editGroup',
  chooseStudent = 'chooseStudent',
}

export type StudentInfoInitialData = {
  id?: string;
  spaceId?: string;
  eduPlanId?: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: Date;
  sex?: Sex;
  hasNotSnilsNumber: Reference[];
  snilsNumber: string;
  hasNotInnNumber: Reference[];
  innNumber: string;
  group?: EduGroup;
  financingSource?: FinancingSource;
  personalNumber?: string;
  bookNumber?: string;
  course?: Course;
};

export type StudentInfo = {
  id: string;
  fio: string;
  email: string;
  course: string;
  financingSource: string;
  personalNumber: string;
  bookNumber: string;
  group: string;
};

export type AddStudentType = {
  groupId: string;
  studentIds: string[];
};

export type Sex = Reference;
export type EduGroup = Reference;
export type FinancingSource = Reference;
export type Course = Reference;

export type GroupStudentsInfo = {
  data: StudentInfo[];
  pagination: PaginationInfo;
};

export type GetStudentsInfoParams = {
  data: GroupStudentsInfo;
  groupId: string;
};
