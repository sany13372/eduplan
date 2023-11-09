import { mutation } from '@src/gql-client';

export const updateContentConstructorLessonScormIdMutation = (lessonId: string): boolean => {
  return mutation.updateContentConstructorLessonScormId({ lessonId }) ?? false;
};
