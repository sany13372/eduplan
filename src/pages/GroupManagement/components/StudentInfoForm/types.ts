import { Reference } from '@src/types';

export type StudentInfo = {
  id?: string;
  spaceId?: string;
  eduPlanId?: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: Date;
  sex?: Reference;
  hasNotSnilsNumber: Reference[];
  snilsNumber: string;
  hasNotInnNumber: Reference[];
  innNumber: string;
  group?: Reference;
  financingSource?: Reference;
  personalNumber?: string;
  bookNumber?: string;
  course?: Reference;
};
