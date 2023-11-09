import { Checkbox } from '@kit-edu/checkbox';
import React, { useMemo } from 'react';
import { SelectedStudents, StudentInfo } from '@src/pages/Lessons/model/types';
import { useFormikContext } from 'formik';

type SelectAllStudentsCellProps = {
  data: StudentInfo[];
};

export const SelectAllStudentsCell = ({ data }: SelectAllStudentsCellProps): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<SelectedStudents>();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('idList', e.target.checked ? data.map((student) => student.id) : []);
  };
  const isChecked = useMemo(() => {
    const selectedDataIdList = data.filter((e) => values.idList.includes(e.id));
    return data.length === selectedDataIdList.length;
  }, [data, values]);

  return <Checkbox id="select_all" checked={isChecked} onChange={changeHandler} className="mx-auto" />;
};
