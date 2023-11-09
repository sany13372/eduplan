import { ScoreInfo } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';
import { isNotEmpty } from '@utils/typescriptUtils';
import { lessonScoreToScoreInfo } from '@src/pages/LessonSettings/model/mappers';
import { defaultControlForm } from '@src/pages/LessonSettings/model/constants';

export const saveScoreInfoMutation = ({
  lessonId,
  themeId,
  contentScoreValue,
  lessonScoreValue,
  controlForm,
  gradeScale,
  gradeSettings,
}: ScoreInfo): ScoreInfo => {
  const resp = mutation.addEditEduLessonGradeScoreSetting({
    scoreSetting: {
      lessonId,
      scoreSetting: {
        contentScoreValue,
        lessonScoreValue,
        // @ts-ignore
        controlFormId: controlForm.systemCode !== defaultControlForm.systemCode ? controlForm.id : undefined,
        gradeScaleId: gradeScale.id,
        gradeSettings: gradeSettings.map((e) => ({
          scoreValue: e.val,
          gradeScaleElementId: e.item.id,
        })),
      },
    },
  });
  if (!isNotEmpty(resp)) throw new Error('Save score info error');
  return lessonScoreToScoreInfo(resp.scoreSetting, themeId, lessonId);
};
