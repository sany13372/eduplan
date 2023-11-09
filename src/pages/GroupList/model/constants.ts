import { EduGroupListInfo, EduGroupListState } from '@src/pages/GroupList/model/types';

export const defaultEduGroupListInfo: EduGroupListInfo = {
  items: [],
  totalItemCount: 0,
};

export const defaultEduGroupListState: EduGroupListState = {
  pageIndex: 0,
  pageSize: 10,
  globalFilter: undefined,
};
