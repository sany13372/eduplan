import { mutation } from '@src/gql-client';

export const deleteLessonMutation = (id: string): string => {
  const resp = mutation.removeEduLesson({
    lesson: { id },
  });
  return resp?.id ?? '';
};
