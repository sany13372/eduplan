import { Reference } from '@src/types';
import { ReferenceExt, StudentsData } from '@src/pages/LessonSettings/model/types';
import { defaultPaginationValue } from '@constants/pagination';

export const allThemeFilter: Reference = { id: 'all', caption: 'Все темы' };
export const lessonKindsWithScores = ['homework'];
export const defaultGradeSystemCode = 'pass-fail';
export const defaultControlForm: ReferenceExt = { id: 'empty', systemCode: 'empty', caption: 'Не указано' };

export const defaultStudentsData: StudentsData = {
  students: [],
  pagination: defaultPaginationValue,
};
