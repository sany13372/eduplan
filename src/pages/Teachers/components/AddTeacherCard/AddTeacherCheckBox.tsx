import { Checkbox } from '@kit-edu/checkbox';
import React from 'react';
import { useFormikContext } from 'formik';
import { TeacherInfo, UpdateTeacherListData } from '@src/pages/Teachers/model/types';

type AddTeacherCheckboxProps = {
  item: TeacherInfo;
};
export const AddTeacherCheckbox = ({ item }: AddTeacherCheckboxProps) => {
  const { values, setFieldValue } = useFormikContext<UpdateTeacherListData>();

  const isNewItem = !values.teacherList.find((e) => e.id === item.id);
  const onChange = () => {
    setFieldValue(
      'teacherList',
      isNewItem ? [...values.teacherList, item] : values.teacherList.filter((e) => e.id !== item.id),
      false,
    );
  };

  return <Checkbox checked={!isNewItem} onChange={onChange} size="small" className="flex-grow-0 flex-shrink-0" />;
};
