import { Pagination, Reference, Student, Teacher } from '@src/types';

export type ReferenceExt = Reference & { systemCode: string };
export type GradeElement = ReferenceExt & { gradeId: string };
export type Theme = {
  id: string;
  rowId: string;
  title: string;
  lessons: Lesson[];
  priority:number | null
};

export type Lesson = {
  id: string;
  rowId: string;
  themeId: string;
  title: string;
  lessonKind: ReferenceExt;
  isContentAdded: boolean;
  isAllowRegistration: boolean;
};

export type Stream = {
  id: string;
  isPublic: boolean;
  lessonId: string;
  themeId: string;
  lessonImplId: string;
  title: string;
  isAllowAlways: boolean;
  startDate: Date | null;
  endDate: Date | null;
  passDate: Date | null;
  studentCount: number;
  teacherList: string[];
};

export type StreamMap = {
  [x: string]: Stream[];
};

export type ActivityInitData = {
  themes: Theme[];
  filters: Reference[];
  streams: Stream[];
  scores: ScoreInfo[];
};

export type StreamCountObj = {
  streamCount: number;
  activeStreamCount: number;
};

export type DrawerType =
  | 'CREATE_STREAM'
  | 'VIEW_STREAM'
  | 'UPDATE_STREAM_TITLE'
  | 'UPDATE_STREAM_DATES'
  | 'VIEW_SCORE_INFO'
  | 'UPDATE_SCORE_INFO'
  | 'LINK_TEACHERS'
  | 'VIEW_LINKED_TEACHERS'
  | 'VIEW_LINKED_STUDENTS'
  | 'LINK_STUDENTS';

export type DrawerData = Pick<Stream, 'id' | 'lessonId' | 'themeId'>;
export type DrawerInfoMap = { [x in DrawerType]: DrawerData | null };
export type SetDrawerInfoParams = {
  type: DrawerType;
  val: DrawerData | null;
};

export type ScoreInfo = {
  themeId: string;
  lessonId: string;
  controlForm: ReferenceExt;
  gradeScale: ReferenceExt;
  gradeSettings: GradeSettingItem[];
  lessonScoreValue: number;
  contentScoreValue: number;
};

export type GradeSettingItem = {
  item: GradeElement;
  val: number;
};

export type ScoreInfoMap = {
  [x: string]: ScoreInfo;
};

export type CommonInfo = {
  planId: string;
  activityId: string;
  hasIot: boolean;
  hasStudents: boolean;
  hasTeachers: boolean;
};

export type LinkTeachersData = { stream: Stream; teachers: Teacher[] };
export type UnlinkTeachersData = { stream: Stream; teacher: Teacher };

export type LinkStudentsData = { stream: Stream; students: Student[]; linkAll: boolean };
export type UnlinkStudentData = { stream: Stream; student: Student };

export type StudentsData = Pagination<{
  students: Student[];
}>;

export type GetStudentsDataParams = StudentsData & { filter: string; streamId: string };
