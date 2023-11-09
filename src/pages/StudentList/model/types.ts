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

export interface GetStudentListParams {
  state: StudentListState;
  eduPlanId: string;
  eduGroupId?: string;
}
export interface StudentListInfo {
  items: StudentInfo[];
  totalItemCount: number;
}
