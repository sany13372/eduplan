import React, { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Form, Formik } from 'formik';
import { FormPrompt, ErrorDialog } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@utils/validation';
import { Store } from 'effector';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';
import { StudentInfo } from './types';
import { studentInfoSchema } from './schema';
import { StudentFormContent } from './StudentFormContent';
import { StudentFormContentProps } from './StudentFormContent';

export type StudentFormProps<T extends StudentInfo> = {
  onReset: () => void;
  onSuccess: (itemId: string) => void;
  initData: T;
  onSubmit: (values: T) => void;
  errorStore: Store<ValidationErrors>;
  resetErrorStore: () => void;
  savedItemIdStore: Store<string>;
  title: string;
  disabledFields?: StudentFormContentProps['disabledFields'];
  modalApi: {
    close: () => void;
  };
};

export const StudentInfoForm = <T extends StudentInfo>({
  onReset,
  onSubmit,
  savedItemIdStore,
  errorStore,
  resetErrorStore,
  onSuccess,
  initData,
  title,
  modalApi,
  disabledFields,
}: StudentFormProps<T>): JSX.Element => {
  const savedItemId = useStore(savedItemIdStore);
  const errors = useStore(errorStore);

  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [savedItemId, onSuccess]);

  return (
    <div className="flex  flex-col space-y-8">
      <div className="flex justify-between">
        <Typography as="h2" size="32px" fontWeight="semibold">
          {title}
        </Typography>
        <Button
          onClick={() => modalApi.close()}
          iconLeftName="master-close"
          appearance="light-outline"
          shape="circular"
        />
      </div>
      <div>
        {!initData && <ErrorMessage />}
        {initData && (
          <Formik<T>
            initialValues={initData}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            initialErrors={{}}
            validationSchema={studentInfoSchema}
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
                <Form>
                  <StudentFormContent onReset={onReset} errorStore={errorStore} disabledFields={disabledFields} />
                </Form>
              </>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};
