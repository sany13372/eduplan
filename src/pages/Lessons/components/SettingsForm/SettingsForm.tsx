import React, { PropsWithChildren, useEffect } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Formik } from 'formik';
import { FormPrompt, ErrorDialog } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@utils/validation';
import { Store } from 'effector';
import { Typography } from '@kit-edu/typography';
import { LessonSettingExt } from '@src/pages/Lessons/model/types';
import { settingsSchema } from '@src/pages/Lessons/model/validation';

export type SettingsFormProps<T extends LessonSettingExt> = {
  onSuccess: (itemId: string) => void;
  initData: T;
  onSubmit: (values: T) => void;
  errorStore: Store<ValidationErrors>;
  resetErrorStore: () => void;
  savedItemIdStore: Store<string>;
  title: string;
};

export const SettingsForm = <T extends LessonSettingExt>({
  savedItemIdStore,
  errorStore,
  resetErrorStore,
  onSuccess,
  initData,
  onSubmit,
  children,
  title,
}: PropsWithChildren<SettingsFormProps<T>>) => {
  const savedItemId = useStore(savedItemIdStore);
  const errors = useStore(errorStore);

  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [savedItemId, onSuccess]);
  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {title}
      </Typography>
      <div>
        {!initData && <ErrorMessage />}
        {initData && (
          <Formik<T>
            initialValues={initData}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            initialErrors={{}}
            validationSchema={settingsSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <>
                <FormPrompt isEnabled={!savedItemId} />
                <ErrorDialog
                  portalId="group_error_dialog_portal"
                  isOpen={Boolean(errors[''])}
                  dialogContent={{ description: errors[''] }}
                  onClose={resetErrorStore}
                />
                {children}
              </>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};
