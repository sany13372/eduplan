import { Checkbox } from '@kit-edu/checkbox';
import React from 'react';
import { SelectedStudents, StudentInfo } from '@src/pages/Lessons/model/types';
import { useFormikContext } from 'formik';

type SelectStudentCellProps = {
  data: StudentInfo;
};
export const SelectStudentCell = ({ data }: SelectStudentCellProps): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<SelectedStudents>();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFieldValue(
      'idList',
      e.target.checked ? [...values.idList, data.id] : values.idList.filter((studentId) => studentId !== data.id),
    );

  return (
    <Checkbox id={data.id} checked={values.idList.includes(data.id)} onChange={changeHandler} className="mx-auto" />
  );
};
