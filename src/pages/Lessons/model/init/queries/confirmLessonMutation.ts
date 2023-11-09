import { mutation } from '@src/gql-client';

export const confirmLessonMutation = ({
  id,
  isAllowRegistration,
}: {
  id: string;
  isAllowRegistration: boolean;
}): string => {
  const resp = mutation.editEduLesson({
    lesson: {
      id,
      isAllowRegistration: !isAllowRegistration,
    },
  });
  return resp?.id ?? '';
};
