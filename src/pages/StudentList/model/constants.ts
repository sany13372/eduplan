import { StudentListInfo, StudentListState } from '@src/pages/StudentList/model/types';

export const defaultStudentListInfo: StudentListInfo = {
  items: [],
  totalItemCount: 0,
};

export const defaultStudentListState: StudentListState = {
  pageIndex: 0,
  pageSize: 10,
  globalFilter: undefined,
};
