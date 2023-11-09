import { createGetActionNodes } from '@utils/effector';
import { createDomain } from 'effector';
import { ImportStudentsDataType, UploadStudentsParamsType } from '@src/widgets/ImportStudents/model/types';

export const importStudentsDomain = createDomain('importStudentsDomain');
export const resetDomain = importStudentsDomain.createEvent();

export const uploadStudents = createGetActionNodes<UploadStudentsParamsType, string>(
  importStudentsDomain,
  '',
  'initial',
);
export const importStudents = createGetActionNodes<string, ImportStudentsDataType | null>(
  importStudentsDomain,
  null,
  'initial',
);
export const $fileImportStudents = importStudentsDomain.createStore<File | null>(null);
export const setFileImportStudents = importStudentsDomain.createEvent<File | null>();
