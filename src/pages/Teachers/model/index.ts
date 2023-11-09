import { createDomain } from 'effector';
import { createDeleteActionNodes, createGetActionNodes, createUpdateActionNodes } from '@utils/effector';
import { SemesterInfo, TeacherInfo, UpdateTeacherListData } from '@src/pages/Teachers/model/types';

export const TeacherManagement = createDomain('TeacherManagement');
export const resetDomainData = TeacherManagement.createEvent();

export const semesterListInfo = createGetActionNodes<string, SemesterInfo[]>(TeacherManagement, []);

export const deleteTeacher = createDeleteActionNodes<string>(TeacherManagement);

export const totalTeacherCount = createGetActionNodes<string, number>(TeacherManagement, 0);

export const $addTeacherDrawerInfo = TeacherManagement.createStore<string>('');
export const setAddTeacherDrawerInfo = TeacherManagement.createEvent<string>();
export const resetAddTeacherDrawerInfo = TeacherManagement.createEvent();

export const inviteTeacherList = createGetActionNodes<string, TeacherInfo[]>(TeacherManagement, []);
export const resetInviteTeacherList = TeacherManagement.createEvent();

export const updateTeacherList = createUpdateActionNodes<UpdateTeacherListData>(TeacherManagement);
