import { createApi, createDomain } from 'effector';
import { ItemProps } from '@kit-edu/dropdown-menu';
import {
  ModalType,
  StudentInfo,
  UpdateGroupInfo,
  CreateGroupInfo,
  AddStudentType,
  GroupStudentsMap,
  GetStudentMapParams,
  BaseInfo,
  ShortUserInfo,
  GroupStudentsInfo,
} from '@src/pages/StudentGroupList/model/types';
import {
  createAddActionNodes,
  createDeleteActionNodes,
  createGetActionNodes,
  createReferenceListNodes,
  createUpdateActionNodes,
} from '@utils/effector';
import { Reference } from '@src/types';
import { status } from 'patronum';

import { selectGroupBaseItems } from './constants';

export const StudentGroupList = createDomain('StudentGroupList');

export const getStudentsListFx = StudentGroupList.createEffect<string, StudentInfo[]>();

export const resetDomain = StudentGroupList.createEvent();
export const groupsStore = createReferenceListNodes<string>(StudentGroupList);

export const getEduPlanGroupFx = StudentGroupList.createEffect<string, Reference[]>();
export const $getEduPlanGroupStatus = status({ effect: getEduPlanGroupFx, defaultValue: 'pending' });

export const excludeStudent = createDeleteActionNodes<ShortUserInfo>(StudentGroupList);
export const deleteGroup = createDeleteActionNodes<Reference>(StudentGroupList);

export const updateGroup = createUpdateActionNodes<UpdateGroupInfo>(StudentGroupList);
export const updateGroupInitialData = createGetActionNodes<string, UpdateGroupInfo | null>(StudentGroupList, null);

export const addGroup = createAddActionNodes<CreateGroupInfo>(StudentGroupList);
export const createGroupInitialData = createGetActionNodes<string, CreateGroupInfo>(StudentGroupList, {
  eduPlanId: '',
  title: '',
  spaceId: '',
});

export const groupTypesStore = createReferenceListNodes<string>(StudentGroupList);

export const deleteStudent = createDeleteActionNodes<ShortUserInfo>(StudentGroupList);

export const setEduPlanId = StudentGroupList.createEvent<string>();

export const setStudentNameFilter = StudentGroupList.createEvent<string>();
export const setGroupSelected = StudentGroupList.createEvent<ItemProps>();
export const resetStudentNameFilter = StudentGroupList.createEvent();
export const resetGroupSelected = StudentGroupList.createEvent();

export const $eduPlanGroups = StudentGroupList.createStore<Reference[]>([]);

export const studentsUpdated = StudentGroupList.createEvent();
export const $studentNameFilter = StudentGroupList.createStore<string>('');

export const $groupMenuTitleItems = $eduPlanGroups.map((groups) =>
  groups.map((group) => ({ id: group.id, label: group.caption })),
);

export const $groupSelected = StudentGroupList.createStore<ItemProps>(selectGroupBaseItems[0]);

export const addStudentsToGroupFx = StudentGroupList.createEffect<AddStudentType, number | undefined>();
export const studentsAddedToGroup = StudentGroupList.createEvent<AddStudentType>();
export const studentsWithoutGroup = createGetActionNodes<string, StudentInfo[]>(StudentGroupList, []);

export const $groupStudentModalName = StudentGroupList.createStore<{
  modalType: ModalType | null;
  id?: string;
  groupId?: string;
}>({
  modalType: null,
});

export const groupStudentModalApi = createApi($groupStudentModalName, {
  openAddStudent: () => ({ modalType: ModalType.addStudent }),
  openAddNewStudentToGroup: (_, id: string) => ({ modalType: ModalType.addStudent, groupId: id }),
  openEditStudent: (_, id) => ({ modalType: ModalType.editStudent, id }),
  openAddGroup: () => ({ modalType: ModalType.addGroup }),
  openEditGroup: (_, id) => ({ modalType: ModalType.editGroup, id }),
  openChooseStudent: () => ({ modalType: ModalType.chooseStudent }),
  openImportStudents: () => ({ modalType: ModalType.importStudents }),
  close: () => ({ modalType: null }),
});

export const resetGroupId = StudentGroupList.createEvent();
export const setGroupId = StudentGroupList.createEvent<string>();
export const $groupId = StudentGroupList.createStore('');

export const groupStudentsMap = createGetActionNodes<GetStudentMapParams, GroupStudentsMap>(StudentGroupList, {});
export const getPageData = StudentGroupList.createEvent<{ planId: string; groupId: string; data: GroupStudentsInfo }>();
export const getPageDataFx = StudentGroupList.createEffect<
  { planId: string; groupId: string; data: GroupStudentsInfo },
  GroupStudentsInfo
>();
export const $baseInfoStore = StudentGroupList.createStore<BaseInfo>({ planId: '' });
export const setBaseInfo = StudentGroupList.createEvent<BaseInfo>();
export const $isNotPossibleCreateStudentModal = StudentGroupList.createStore(false);
export const setIsNotPossibleCreateStudentModal = StudentGroupList.createEvent<boolean>();
