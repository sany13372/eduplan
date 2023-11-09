import { Checkbox } from '@kit-edu/checkbox';
import { useFormikContext } from 'formik';
import { LinkStudentsData } from '@src/pages/LessonSettings/model/types';
import React from 'react';

export const LinkAllCheckbox = () => {
  const { values, setValues } = useFormikContext<LinkStudentsData>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, linkAll: e.target.checked });
  };
  return <Checkbox checked={values.linkAll} label="Выбрать всех обучающихся" onChange={onChange} />;
};
