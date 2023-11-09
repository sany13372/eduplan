import React, { PropsWithChildren, useEffect } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Formik } from 'formik';
import { FormPrompt, ErrorDialog } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@utils/validation';
import { Store } from 'effector';
import { LessonItemShort } from '@src/pages/Lessons/model/types';
import { lessonSchema } from '@src/pages/Lessons/model/validation';

export type LessonFormProps<T extends LessonItemShort> = {
  onSuccess: (itemId: string) => void;
  initData: T;
  onSubmit: (values: T) => void;
  errorStore: Store<ValidationErrors>;
  resetErrorStore: () => void;
  savedItemIdStore: Store<string>;
};

export const LessonForm = <T extends LessonItemShort>({
  savedItemIdStore,
  errorStore,
  resetErrorStore,
  onSuccess,
  initData,
  onSubmit,
  children,
}: PropsWithChildren<LessonFormProps<T>>) => {
  const savedItemId = useStore(savedItemIdStore);
  const errors = useStore(errorStore);

  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [savedItemId, onSuccess]);
  return (
    <div className="h-full">
      {!initData && <ErrorMessage />}
      {initData && (
        <Formik<T>
          initialValues={initData}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          initialErrors={{}}
          validationSchema={lessonSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <>
              <FormPrompt isEnabled={!savedItemId} />
              <ErrorDialog
                portalId="group_error_dialog_portal"
                isOpen={Boolean(errors[''])}
                dialogContent={{
                  description: errors[''],
                }}
                onClose={resetErrorStore}
              />
              {children}
            </>
          )}
        </Formik>
      )}
    </div>
  );
};
