import { Reference } from '@src/types';

export type ObjCommon = {
  id: string;
  elementType: ElementType;
  path: string;
};
export type ElementType = 'group' | 'lesson';
export type LessonGroup = ObjCommon & {
  elementType: 'group';
  groupInfo: {
    id: string;
    title: string;
    objType?: ObjType;
    childrens: Lesson[];
  };
};
type ObjType = {
  title: string;
  shortTitle: string;
  systemCode: string;
};
export type EduKind = Reference;

export type LessonItem = ObjCommon & {
  elementType: 'lesson';
  itemInfo: {
    id: string;
    title: string;
    eduKind: EduKind;
    hasContent: boolean;
    isAllowRegistration: boolean;
    settings?: LessonSettings;
  };
};

export type LessonSettings = {
  id: string;
  implId: string;
  studentCount: number;
  isPublic: boolean;
  isAllowAlways: boolean;
  startDate?: string;
  endDate?: string;
  passDate?: string;
};

export type Lesson = LessonGroup | LessonItem;

export type GetLessonListParams = {
  eduPlanRowId: string;
  withoutGroups: boolean;
};

export type LessonItemShort = {
  id?: string;
  eduPlanId: string;
  eduPlanRowId: string;
  title: string;
  eduKind?: EduKind;
  themeId: string;
  priority:number | null;
  rowId?:string;
};

export type GetLessonInitDataParams = {
  themeId: string;
  lessonId?: string;
};

export type GetSettingsInitDataParams = {
  lessonId: string;
  settingId?: string | null;
};

export type LessonSettingExt = {
  lessonId: string;
  eduPlanId: string;
  eduPlanRowId: string;
  title: string;
} & Omit<LessonSettings, 'studentCount'>;

export type SelectedImplsParams = {
  isChecked: boolean;
  items: Lesson[];
  themeId: string;
};

export type SelectedImplsInfo = Record<string, string[]>;

export type EduPlanRowShortInfo = {
  id: string;
  eduPlanId: string;
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

export interface StudentListState {
  pageIndex: number;
  pageSize: number;
  globalFilter?: undefined;
}

export type GetStudentListParams = {
  state: StudentListState;
  activityRowId: string;
  implId?: string;
};

export type StudentListInfo = {
  items: StudentInfo[];
  totalItemCount: number;
};

export type SelectedStudents = {
  idList: string[];
  activityRowId: string;
  implIdList: string[];
};

export type LessonUpdatePriority = {
  firstId:string,
  secondId:string
  eduPlanRowId:string
}