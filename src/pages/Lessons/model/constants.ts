import { Reference } from '@src/types';
import { StudentListInfo, StudentListState } from '@src/pages/Lessons/model/types';

export const defaultObj: Reference = { id: 'all', caption: 'Все' };

export const defaultStudentListInfo: StudentListInfo = {
  items: [],
  totalItemCount: 0,
};

export const defaultStudentListState: StudentListState = {
  pageIndex: 0,
  pageSize: 10,
  globalFilter: undefined,
};
