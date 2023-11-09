import { ComboBox, NewLabel } from '@sber-universe/om-component-library';
import React from 'react';
import { ContentPanel } from '@src/pages/LessonSettings/components';
import { useStore } from 'effector-react';
import { controlFormStore } from '@src/pages/LessonSettings/model';
import { defaultControlForm } from '@src/pages/LessonSettings/model/constants';

import styles from './ControlFormBlock.module.css';

export const ControlFormBlock = () => {
  const controlForms = useStore(controlFormStore.$items);

  return (
    <ContentPanel variant="white" className="flex flex-col gap-y-5">
      <NewLabel label="Форма контроля" type="optional" variant="horizontal" className={styles.controlForm}>
        <ComboBox
          name="controlForm"
          items={[defaultControlForm, ...controlForms]}
          fullWidth
          matchWidth
          placeholder="Выберите форму контроля"
        />
      </NewLabel>
    </ContentPanel>
  );
};
