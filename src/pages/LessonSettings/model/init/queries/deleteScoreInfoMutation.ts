import { ScoreInfo } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';

export const deleteScoreInfoMutation = (val: ScoreInfo): string => {
  const resp = mutation.removeEduLessonGradeScoreSetting({ lessonId: val.lessonId });
  return resp ? val.lessonId : '';
};
