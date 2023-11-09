import { PaginationInfo, Reference, StudentInfo } from '@src/types';

export type GroupReference = Reference;

export type EduGridElementData = Reference & {
  iotTemplateCount: number;
  planId: string;
  priority: number;
};

export type GridElementTemplateCount = {
  [x: string]: number;
};

export type EduGridElementObj = Reference;
export type GroupObj = Reference;
export type StudentObj = {
  id: string;
  fullName: string;
};

export type StudentTrajectory = {
  eduGridElementId: string;
  isSelected: IsSelectedForEduGridElement;
  studentInfo: StudentObj;
  groupInfo: GroupObj;
  trajectoryList: TrajectoryData[];
};

export type TrajectoryData = {
  id: string;
  gridElementId: string;
  rows: TrajectoryRowData[];
};

export type TrajectoryRowData = {
  id: string;
  activityId: string;
};

export type IsSelectedForEduGridElement = {
  [x: string]: boolean;
};

export type Row = {
  id: string;
  gridElementId: string;
  isGroup: boolean;
  activityId: string;
  activityTitle: string;
  activityGroupTitle: string;
  priority?: number | null;
  path: string;
};

export type ActivityRow = { isGroup: false } & Row;
export type GroupRow = {
  isGroup: true;
  childrens: ActivityRow[];
} & Row;

export type Activity = ActivityRow | GroupRow;

export type CheckedStateInfo = {
  id?: string;
  gridElementId: string;
  checked: boolean;
};

export type AddIotData = {
  iotTemplateData?: IotTemplateData;
  studentIdList: string[];
};

export type IotTemplateData = {
  id: string;
  eduGridElementId: string;
  caption: string;
  rows: IotTemplateRowData[];
};

export type IotTemplateRowData = Reference;

export type GetTemplatesParams = { planId: string; gridElementId: string };

export type IotFiltersData = {
  [x: string]: FilterObj;
};

export type FilterObj = {
  fio: string;
  group: GroupObj[];
  showAll: boolean;
};

export type FioFilterParams = {
  eduGridElementId: string;
  value: string;
};

export type GroupFilterParams = {
  eduGridElementId: string;
  value: GroupObj[];
};

export type ShowAllParams = {
  eduGridElementId: string;
  value: boolean;
};

export type FilterObjNew = {
  fio: string;
  group: GroupObj;
  gridElement: EduGridElementObj;
  showAll: boolean;
};

export type EduGridStudentsInfoMap = {
  [x: string]: StudentsListInfo;
};

export type StudentInfoBase = Pick<StudentInfo, 'id' | 'fio' | 'group'> & {
  trajectoryList: TrajectoryData[];
};
export type StudentsListInfo = {
  data: StudentTrajectory[];
  pagination: PaginationInfo;
};

export type GetStudentsListInfoParams = {
  filters: FilterObjNew;
  planId: string;
  data: StudentsListInfo;
};
