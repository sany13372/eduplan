export type Reference = {
  id: string;
  caption: string;
};

export type Status = Reference;
export type Course = Reference;
export type FinancingSource = Reference;
export type CardType = Reference;
export type Sex = Reference;
export type EduGroup = Reference;

export type StudentInfo = {
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
