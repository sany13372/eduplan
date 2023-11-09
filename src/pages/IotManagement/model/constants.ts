import { Reference } from '@src/types';
import { EduGridElementObj, FilterObj, FilterObjNew, GroupObj } from '@src/pages/IotManagement/model/types';

export const defaultObj: Reference = { id: 'all', caption: 'Все' };

export const defauleEduGridElementItem: EduGridElementObj = defaultObj;

export const defaultGroupObj: GroupObj = defaultObj;
export const emptyGroupObj: GroupObj = { id: 'empty', caption: 'Без группы' };

export const defaultIotFilterVal: FilterObj = {
  fio: '',
  showAll: true,
  group: [defaultGroupObj],
};

export const defaultNewFilterVal: FilterObjNew = {
  fio: '',
  showAll: true,
  group: defaultGroupObj,
  gridElement: defauleEduGridElementItem,
};

export const defaultPagination = { pageSize: 50, pageIndex: 0, count: 50 };
