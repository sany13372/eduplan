import { createDomain, createApi } from 'effector';
import {
  createReferenceListNodes,
  createAddActionNodes,
  createGetActionNodes,
  createUpdateActionNodes,
  createDeleteActionNodes,
} from '@utils/effector';
import {
  StudentInfo,
  StudentInfoInitialData,
  GroupInfo,
  GroupStudentsInfo,
  GetStudentsInfoParams,
} from '@src/pages/GroupManagement/model/types';
import { defaultGroupStudentsInfo } from '@src/pages/GroupManagement/model/constants';

import { ModalType, CreateGroupInfo, UpdateGroupInfo, ViewGroupInfo } from './types';

export const GroupManagement = createDomain('GroupManagement');

export const resetDomain = GroupManagement.createEvent();
export const groupTypesStore = createReferenceListNodes<string>(GroupManagement);

export const addGroup = createAddActionNodes<CreateGroupInfo>(GroupManagement);
export const createGroupInitialData = createGetActionNodes<string, CreateGroupInfo>(GroupManagement, {
  eduPlanId: '',
  title: '',
  spaceId: '',
});

export const updateGroup = createUpdateActionNodes<UpdateGroupInfo>(GroupManagement);
export const updateGroupInitialData = createGetActionNodes<string, UpdateGroupInfo | null>(GroupManagement, null);

export const deleteStudent = createDeleteActionNodes<StudentInfo>(GroupManagement);
export const excludeStudent = createDeleteActionNodes<StudentInfo>(GroupManagement);

export const $pageParams = GroupManagement.createStore<{ groupId: string; planId: string }>({
  groupId: '',
  planId: '',
});
export const setPageParams = GroupManagement.createEvent<{ groupId: string; planId: string }>();

export const deleteGroup = createDeleteActionNodes<GroupInfo>(GroupManagement);

export const StudentModal = createDomain('StudentModal');
export const resetStudentModal = StudentModal.createEvent();

export const sexStore = createReferenceListNodes<string>(StudentModal);
export const courseStore = createReferenceListNodes<string>(StudentModal);
export const financingSourceStore = createReferenceListNodes<string>(StudentModal);
export const groupsStore = createReferenceListNodes<string>(StudentModal);

export const updateStudentInfo = createUpdateActionNodes<StudentInfoInitialData>(StudentModal);
export const createStudentInfo = createAddActionNodes<StudentInfoInitialData>(StudentModal);
export const createStudentInfoInitialData = createGetActionNodes<
  { planId: string; group?: { id: string; caption: string } },
  StudentInfoInitialData | null
>(StudentModal, null);
export const eduGroupInfo = createGetActionNodes<string, ViewGroupInfo | null>(StudentModal, null);

export const studentInfo = createGetActionNodes<string, StudentInfoInitialData | null>(StudentModal, null);

export const $groupManagementModalName = StudentModal.createStore<{ modalType: ModalType | null; id?: string }>({
  id: '',
  modalType: null,
});

export const groupManagementModalApi = createApi($groupManagementModalName, {
  openAddStudent: () => ({ modalType: ModalType.addStudent }),
  openEditStudent: (_, id) => ({ modalType: ModalType.editStudent, id }),
  openEditGroup: (_, id) => ({ modalType: ModalType.editGroup, id }),
  openChooseStudent: () => ({ modalType: ModalType.chooseStudent }),
  close: () => ({ modalType: null, id: '' }),
});

export const groupStudents = createGetActionNodes<GetStudentsInfoParams, GroupStudentsInfo>(
  GroupManagement,
  defaultGroupStudentsInfo,
  'initial',
);

export const groupStudentsInitial = createGetActionNodes<GetStudentsInfoParams, GroupStudentsInfo>(
  GroupManagement,
  defaultGroupStudentsInfo,
  'initial',
);
