import { ItemProps } from '@kit-edu/dropdown-menu/build/components/interfaces';
import { GroupStudentsInfo } from '@src/pages/StudentGroupList/model/types';
import { Reference } from '@src/types';

export enum GroupItemEnum {
  addStudent = 'addStudent',
  addGroup = 'addGroup',
  importStudents = 'importStudents',
}

export enum StudentCardItemEnum {
  edit = 'edit',
  exclude = 'exclude',
  remove = 'remove',
}

export enum AdvancedGroupItemEnum {
  read = 'read',
  addNewStudent = 'addNewStudent',
  chooseStudent = 'chooseStudent',
  editGroup = 'editGroup',
  removeGroup = 'removeGroup',
}

export enum SelectBaseGroupItemEnum {
  allGroups = 'allGroups',
}
export const baseGroupItemsActions = [
  { id: GroupItemEnum.addStudent, label: 'Добавить обучающегося' },
  { id: GroupItemEnum.addGroup, label: 'Добавить группу' },
  { id: GroupItemEnum.importStudents, label: 'Импортировать обучающихся' },
];

export const studentCardItemsActions: ItemProps[] = [
  { id: StudentCardItemEnum.edit, label: 'Редактировать' },
  { id: StudentCardItemEnum.exclude, label: 'Исключить из группы' },
  { id: StudentCardItemEnum.remove, label: 'Удалить' },
];

export const advancedGroupItemsActions = [
  { id: AdvancedGroupItemEnum.read, label: 'Посмотреть данные' },
  { id: AdvancedGroupItemEnum.addNewStudent, label: 'Добавить нового обучающегося' },
  { id: AdvancedGroupItemEnum.chooseStudent, label: 'Выбрать обучающегося из списка' },
  { id: AdvancedGroupItemEnum.editGroup, label: 'Редактировать группу' },
  { id: AdvancedGroupItemEnum.removeGroup, label: 'Удалить группу' },
];

export const selectGroupBaseItems = [{ id: SelectBaseGroupItemEnum.allGroups, label: 'Все группы' }];

export const emptyGroupId = 'emptyGroup'; // принимаем, что студенты без группы "живут" в отдельной группе
export const emptyGroup: Reference = { id: emptyGroupId, caption: 'Без группы' };
export const defaultGroupStudentsInfo: GroupStudentsInfo = {
  students: [],
  pagination: { count: 50, pageIndex: 0, pageSize: 50 },
};
