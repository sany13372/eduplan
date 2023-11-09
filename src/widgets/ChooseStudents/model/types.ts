import { PaginationInfo, StudentInfo } from '@src/types';

export type ChooseStudentsInfo = {
  data: StudentInfo[];
  pagination: PaginationInfo;
};

export type BaseInfo = {
  groupId: string;
  planId: string;
};

export type GetStudentsParams = {
  data: ChooseStudentsInfo;
  baseInfo: BaseInfo;
  filter: string;
};
