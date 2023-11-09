import { Stream } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const toggleIsPublMutation = (stream: Stream): Stream => {
  const resp = mutation.switchEduLessonImplIsPublic({
    switchData: {
      implementationSettingId: stream.id,
      isPublic: !stream.isPublic,
    },
  });

  return { ...stream, isPublic: Boolean(resp?.isPublic) };
};
