import { mutation } from '@src/gql-client';
import { LessonSettings } from '@src/pages/Lessons/model/types';

export const publicateLessonMutation = ({ id, isPublic }: LessonSettings): string => {
  const resp = mutation.switchEduLessonImplIsPublic({
    switchData: {
      implementationSettingId: id,
      isPublic: !isPublic,
    },
  });
  return resp?.id ?? '';
};
