import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Formik } from 'formik';
import { FormPrompt, ErrorDialog } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@utils/validation';
import { Store } from 'effector';
import { StudentInfo } from '@src/pages/StudentManagement/model/types';
import { StudentFormContent } from '@src/pages/StudentManagement/components';
import { studentInfoSchema } from '@src/pages/StudentManagement/model/validation';
import { Typography } from '@kit-edu/typography';

export type StudentFormProps<T extends Partial<StudentInfo>> = {
  onSuccess: (itemId: string) => void;
  initData: T;
  onSubmit: (values: T) => void;
  onReset: () => void;
  errorStore: Store<ValidationErrors>;
  resetErrorStore: () => void;
  savedItemIdStore: Store<string>;
  title: string;
};

export const StudentForm = <T extends Partial<StudentInfo>>({
  savedItemIdStore,
  errorStore,
  resetErrorStore,
  onSuccess,
  initData,
  onSubmit,
  onReset,
  title,
}: StudentFormProps<T>): JSX.Element => {
  const savedItemId = useStore(savedItemIdStore);
  const errors = useStore(errorStore);

  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [savedItemId, onSuccess]);
  return (
    <div className="flex  flex-col space-y-8">
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
                <StudentFormContent onReset={onReset} errorStore={errorStore} />
              </>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};
