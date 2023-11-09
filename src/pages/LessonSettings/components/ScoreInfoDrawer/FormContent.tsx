import { Lesson, ScoreInfo } from '@src/pages/LessonSettings/model/types';
import { Form, useFormikContext } from 'formik';
import { $saveScoreInfoStatus, confirmUpdateScoreInfoDrawerClose } from '@src/pages/LessonSettings/model';
import { useStore } from 'effector-react';
import { Drawer } from '@sber-universe/om-component-library';
import React from 'react';
import { useEnableConfirm } from '@src/utils/hooks';
import { CloseDrawerConfirmDialog, DrawerFormButtons } from '@src/components';

import { MaxScoreBlock } from './MaxScoreBlock';
import { ControlFormBlock } from './ControlFormBlock';
import { LessonTitleBlock } from './LessonTitleBlock';
import { GradesInfoBlock } from './GradesInfoBlock';

type FormContentProps = {
  portalId: string;
  lesson: Lesson;
  onResetClick: () => void;
};

export const FormContent = ({ portalId, lesson, onResetClick }: FormContentProps) => {
  const { submitForm } = useFormikContext<ScoreInfo>();
  const status = useStore($saveScoreInfoStatus);
  useEnableConfirm({ nodes: confirmUpdateScoreInfoDrawerClose });
  return (
    <Form className="flex flex-col gap-y-[40px]">
      <div className="space-y-2">
        <LessonTitleBlock title={lesson.title} />
        <ControlFormBlock />
      </div>
      <MaxScoreBlock />

      <GradesInfoBlock />
      <CloseDrawerConfirmDialog nodes={confirmUpdateScoreInfoDrawerClose} />

      <Drawer.Footer portalId={portalId}>
        <DrawerFormButtons onResetClick={onResetClick} status={status} onSubmit={submitForm} />
      </Drawer.Footer>
    </Form>
  );
};
