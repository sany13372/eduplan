import { createDomain } from 'effector';
import { createDeleteActionNodes, createGetActionNodes } from '@utils/effector';
import { defaultStudentListInfo } from '@src/pages/StudentList/model/constants';
import { GetStudentListParams, StudentInfo, StudentListInfo } from '@src/pages/StudentList/model/types';

export const StudentListDomain = createDomain('StudentListDomain');
export const resetDomain = StudentListDomain.createEvent();

export const studentListInfo = createGetActionNodes<GetStudentListParams, StudentListInfo>(
  StudentListDomain,
  defaultStudentListInfo,
);

export const deleteStudent = createDeleteActionNodes<StudentInfo>(StudentListDomain);
