import { Stream } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const deleteStreamMutation = (val: Stream): string => {
  const res = mutation.removeEduLessonImplWithSetting({ lessonImplId: val.id });
  return res ? val.id : '';
};
