import { Form, useFormikContext } from 'formik';
import { FormButtonGroup } from '@sber-universe/om-component-library';
import React from 'react';
import { SelectedStudents } from '@src/pages/Lessons/model/types';
import { StudentTable } from '@src/pages/Lessons/components';
import { studentTableColumnsWithSelect } from '@src/pages/Lessons/components/StudentsTable';

export type StudentsFormContentProps = {
  onReset: () => void;
  isSubmitted: boolean;
};

export const StudentsFormContent = <T extends SelectedStudents>({ onReset }: StudentsFormContentProps): JSX.Element => {
  const { dirty, values, initialValues, setFieldValue } = useFormikContext<T>();

  const resetStudentsIdList = () => {
    setFieldValue('idList', initialValues.idList);
  };

  return (
    <Form className="space-y-1.5">
      <StudentTable
        activityRowId={values.activityRowId}
        columns={studentTableColumnsWithSelect}
        onGetData={resetStudentsIdList}
      />
      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} />
    </Form>
  );
};
