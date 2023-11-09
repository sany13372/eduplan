import { createDomain } from 'effector';
import { createAddActionNodes, createGetActionNodes, createReferenceListNodes } from '@utils/effector';
import { StudentInfo } from '@src/pages/StudentManagement/model/types';

export const StudentManagement = createDomain('StudentManagement');
export const resetDomain = StudentManagement.createEvent();
export const sexStore = createReferenceListNodes<string>(StudentManagement);
export const courseStore = createReferenceListNodes<string>(StudentManagement);
export const financingSourceStore = createReferenceListNodes<string>(StudentManagement);
export const groupsStore = createReferenceListNodes<string>(StudentManagement);

export const createStudentInfoInitialData = createGetActionNodes<string, StudentInfo | null>(StudentManagement, null);
export const createStudentInfo = createAddActionNodes<StudentInfo>(StudentManagement);
