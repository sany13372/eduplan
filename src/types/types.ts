export type Reference = {
  id: string;
  caption: string;
};

export type EduProgramBase = {
  id: string;
  title: string;
  shortTitle: string;
  space: Reference;
};

export type EduProgramReferences = {
  domainListGeneration: Reference;
  domainOfStudy: Reference;
  eduLevel: Reference;
  eduProgramKind: Reference;
};

export type EduProgramInfo = EduProgramBase & EduProgramReferences;

export type EduProgramInfoShort = Pick<EduProgramInfo, 'id' | 'title' | 'space' | 'domainOfStudy'>;

export type UpdateEduProgramInfo = Omit<EduProgramInfo, 'space'>;

export type AddEduProgramInfo = Omit<EduProgramBase & Partial<EduProgramReferences>, 'id' | 'space'>;
export type DefaultParams = {
  id: string;
};
export type EduPlanParams = {
  planId: string;
};

export type PaginationInfo = {
  pageSize: number;
  pageIndex: number;
  count: number;
};

export type StudentInfo = {
  id: string;
  fio: string;
  email: string;
  course: string;
  financingSource: { title: string; shortTitle: string };
  personalNumber: string;
  bookNumber: string;
  group: Reference;
};

/**
 * Базовые типы для абстрактного пользователя, студента и препода
 */

export type FullName = {
  firstName: string;
  lastName: string;
  middleName: string;
};
type Person = {
  id: string;
  email: string;
  fullName: FullName;
};

export type Student = { group?: Reference } & Person;
export type Teacher = { tenant?: Reference } & Person;

export type Pagination<T extends Record<string, unknown>> = T & { pagination: PaginationInfo };
