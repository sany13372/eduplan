import { PaginationInfo, StudentInfo as StudentInfoBase } from '@src/types';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum ModalType {
  addStudent = 'addStudent',
  editStudent = 'editStudent',
  addGroup = 'addGroup',
  editGroup = 'editGroup',
  chooseStudent = 'chooseStudent',
  importStudents = 'importStudents',
}

export type StudentInfo = {
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
};

export type FullStudentInfo = {
  id?: string;
  spaceId?: string;
  eduPlanId?: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: Date;
  sex?: Sex;
  hasNotSnilsNumber: boolean;
  snilsNumber: string;
  hasNotInnNumber: boolean;
  innNumber: string;
  group?: EduGroup;
  financingSource?: FinancingSource;
  personalNumber?: string;
  bookNumber?: string;
  course?: Course;
};

export type BaseGroupInfo = Partial<{
  id: string;
  title: string;
  groupType: EduGroupType;
  eduPlanId: string;
  spaceId: string;
}>;

export type CreateGroupInfo = PartialBy<Required<BaseGroupInfo>, 'id' | 'groupType'>;

export type Reference = {
  id: string;
  caption: string;
};

export type AddStudentType = {
  groupId: string;
  studentIds: string[];
};

export type EduGroupType = Reference;

export type UpdateGroupInfo = Required<BaseGroupInfo>;

export type Status = Reference;
export type Course = Reference;
export type FinancingSource = Reference;
export type Sex = Reference;
export type EduGroup = Reference;

export type GroupStudentsMap = {
  [x: string]: GroupStudentsInfo;
};

export type ShortUserInfo = Pick<StudentInfoBase, 'id' | 'email' | 'bookNumber' | 'fio'> & { groupId: string };
export type GroupStudentsInfo = {
  students: ShortUserInfo[];
  pagination: PaginationInfo;
};

export type GetStudentMapParams = { data: GroupStudentsMap; eduPlanId: string };

export type BaseInfo = { planId: string };
