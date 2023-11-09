import { ItemProps } from '@kit-edu/dropdown-menu/build/components/interfaces';
import { GroupStudentsInfo } from '@src/pages/GroupManagement/model/types';

export enum StudentCardItemEnum {
  edit = 'edit',
  exclude = 'exclude',
  remove = 'remove',
}

export const studentCardItemsActions: ItemProps[] = [
  { id: StudentCardItemEnum.edit, label: 'Редактировать' },
  { id: StudentCardItemEnum.exclude, label: 'Исключить из группы' },
  { id: StudentCardItemEnum.remove, label: 'Удалить' },
];

export const defaultGroupStudentsInfo: GroupStudentsInfo = {
  data: [],
  pagination: { count: 50, pageIndex: 0, pageSize: 50 },
};
