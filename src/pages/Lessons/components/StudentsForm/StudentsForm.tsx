import React, { useEffect, useMemo } from 'react';
import { useStore } from 'effector-react';
import { Formik } from 'formik';
import { FormPrompt, ErrorDialog } from '@sber-universe/om-component-library';
import { SelectedStudents } from '@src/pages/Lessons/model/types';
import { updateLinkedStudents } from '@src/pages/Lessons/model';

import { StudentsFormContent } from './StudentsFormContent';

export type StudentsFormProps<T extends SelectedStudents> = {
  onSuccess: (itemId: string) => void;
  initData: T;
  onReset: () => void;
};

export const StudentsForm = <T extends SelectedStudents>({ onSuccess, initData, onReset }: StudentsFormProps<T>) => {
  const { $status, $validationErrors, resetErrors, $updatedId, update } = updateLinkedStudents;
  const errors = useStore($validationErrors);
  const savedItemId = useStore($updatedId);
  const submitStatus = useStore($status);
  const isSubmitted = useMemo(() => submitStatus === 'pending', [submitStatus]);
  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [savedItemId, onSuccess]);
  return (
    <Formik<T> initialValues={initData} onSubmit={update}>
      {() => (
        <>
          <FormPrompt isEnabled={!savedItemId} />
          <ErrorDialog
            portalId="link_student_error_dialog_portal"
            isOpen={Boolean(errors[''])}
            onClose={resetErrors}
            dialogContent={{
              description: errors[''],
            }}
          />
          <StudentsFormContent isSubmitted={isSubmitted} onReset={onReset} />
        </>
      )}
    </Formik>
  );
};
