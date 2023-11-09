import { createGate, useGate, useStore } from 'effector-react';
import '@src/pages/ActivityManagement/model/init';
import { Drawer, ErrorMessage } from '@src/components';
import {
  saveLesson,
  saveLessonInitialData,
  eduKindStore,
  SaveLessonParams,
  $saveLessonParams,
  closeSaveLessonForm,
  SaveLessonGate,
} from '@src/pages/Lessons/model';
import { LessonForm, LessonFormContent } from '@src/pages/Lessons/components';
import './model/init';
import { ConfirmDialog, LoadingWrapper } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';
import { useState } from 'react';
import { useFormikContext } from 'formik';

interface SaveLessonProps {
  params: SaveLessonParams;
  onClose: () => void;
}

const FormStateGate = createGate<{ dirty: boolean }>('SaveLessonFormState');

function FormStateBubble() {
  const { dirty } = useFormikContext();
  return <FormStateGate dirty={dirty} />;
}

const SaveLesson = ({ params, onClose }: SaveLessonProps): JSX.Element => {
  useGate(SaveLessonGate, params);

  const { add, $validationErrors, $createdId, resetErrors, $status } = saveLesson;
  const createEffectStatus = useStore($status);

  const eduKinds = useStore(eduKindStore.$items);
  const eduKindsIsLoading = useStore(eduKindStore.$loading);

  const initDataStatus = useStore(saveLessonInitialData.$status);
  const initData = useStore(saveLessonInitialData.$value);

  return (
    <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
      {!initData && <ErrorMessage />}
      {initData && (
        <div className="flex flex-col space-y-8 h-full pt-7">
          <div className="flex items-center justify-between px-9">
            <Typography as="h2" size="32px" fontWeight="semibold">
              {initData.id ? 'Редактирование занятия' : 'Добавление занятия'}
            </Typography>

            <Button
              shape="circular"
              iconLeftName="master-close"
              size="small"
              appearance="dark-outline"
              onClick={onClose}
            />
          </div>
          <LessonForm
            onSuccess={() => closeSaveLessonForm()}
            initData={initData}
            onSubmit={add}
            errorStore={$validationErrors}
            resetErrorStore={resetErrors}
            savedItemIdStore={$createdId}
          >
            <LessonFormContent
              mode={initData.id ? 'edit' : 'new'}
              eduKinds={eduKinds}
              onReset={onClose}
              eduKindsIsAvailable={eduKindsIsLoading}
              isSubmitted={createEffectStatus === 'pending'}
            />

            <FormStateBubble />
          </LessonForm>
        </div>
      )}
    </LoadingWrapper>
  );
};

export function SaveLessonDrawer(): JSX.Element {
  const params = useStore($saveLessonParams);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { dirty } = useStore(FormStateGate.state);

  const tryToClose = () => {
    if (dirty) {
      setConfirmVisible(true);
    } else {
      closeSaveLessonForm();
    }
  };

  const closeFinally = () => {
    setConfirmVisible(false);
    closeSaveLessonForm();
  };

  const cancelClosing = () => {
    setConfirmVisible(false);
  };

  return (
    <>
      <ConfirmDialog
        onConfirm={closeFinally}
        isOpen={confirmVisible}
        onCancel={cancelClosing}
        dialogContent={{
          title: 'Подтверждение',
          confirmLabel: 'Да, выйти',
          cancelLabel: 'Остаться',
          description:
            'У вас есть несохраненные изменения. Если вы выйдите из режима редактирования, несохраненные данные будут утеряны. Выйти из режима редактирования?',
        }}
      />
      <Drawer small isOpen={Boolean(params)} onClose={tryToClose}>
        <div className="bg-base-200 h-full">{params && <SaveLesson params={params} onClose={tryToClose} />}</div>
      </Drawer>
    </>
  );
}
