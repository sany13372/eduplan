/**
 * Типы, описывающие лекции/темы в терминах новых экшенов
 * После переезда на новые экшены должны переехать в types.ts
 * Лежит отдельно для избежания конфликтов имен
 */
import { LessonContentTypes } from '@src/gql-client';

export type Lesson = {
  id: string;
  title: string;
  kind: string;
  hasContent: boolean;
  isAllowRegistration: boolean;
  isScorm: boolean;
  lessonContentType: LessonContentTypes;
  priority: number | null;
  rowId: string;
};

export type ThemeWithLessons = {
  id: string;
  rowId: string;
  title: string;
  lessonsCount: number;
  lessons: Lesson[];
  priority: number | null;
};
