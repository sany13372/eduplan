import { Typography } from '@kit-edu/typography';
import { NewLabel } from '@sber-universe/om-component-library';
import React from 'react';
import { NumberInput } from '@src/pages/LessonSettings/components/Base/NumberInput';
import { ContentPanel } from '@src/pages/LessonSettings/components';
import { FieldWrapper } from '@src/pages/LessonSettings/components/Base/FieldWrapper';

export const MaxScoreBlock = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Typography as="h4" fontWeight="semibold" size="16px">
          Результат прохождения занятия
        </Typography>
      </div>
      <ContentPanel variant="white">
        <NewLabel label="Максимальный балл" type="default" variant="horizontal">
          <FieldWrapper name="lessonScoreValue">
            <NumberInput className="max-w-[172px]" name="lessonScoreValue" />
          </FieldWrapper>
        </NewLabel>
      </ContentPanel>
    </div>
  );
};
