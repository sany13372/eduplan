import { Lesson } from '@src/pages/LessonSettings/model/types';
import { Button } from '@kit-edu/button';
import React from 'react';
import { setDrawerInfo } from '@src/pages/LessonSettings/model';
import { lessonKindsWithScores } from '@src/pages/LessonSettings/model/constants';
import { Hint } from '@kit-edu/tooltip/build/presets';

export const ButtonGroup = ({ themeId, id, lessonKind }: Pick<Lesson, 'themeId' | 'id' | 'lessonKind'>) => {
  const scoreSettingsIsLocked = !lessonKindsWithScores.includes(lessonKind.systemCode);
  const addStreamClickHandler = () => {
    setDrawerInfo({
      type: 'CREATE_STREAM',
      val: {
        themeId,
        lessonId: id,
        id: '',
      },
    });
  };

  const addScoreInfoHandler = () => {
    setDrawerInfo({
      type: 'VIEW_SCORE_INFO',
      val: {
        themeId,
        lessonId: id,
        id: '',
      },
    });
  };
  return (
    <div className="flex gap-x-4 shrink-0">
      <Button size="medium" appearance="light-outline" onClick={addStreamClickHandler}>
        Добавить поток
      </Button>
      <Hint
        disabled={!scoreSettingsIsLocked}
        text='Оценка может быть только у занятий вида "Домашнее задание"'
        maxWidth="230px"
      >
        <Button size="medium" appearance="light-outline" disabled={scoreSettingsIsLocked} onClick={addScoreInfoHandler}>
          Настроить оценку
        </Button>
      </Hint>
    </div>
  );
};
