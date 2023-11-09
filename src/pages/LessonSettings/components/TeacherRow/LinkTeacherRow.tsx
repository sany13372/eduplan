import { LinkTeachersData } from '@src/pages/LessonSettings/model/types';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { Teacher } from '@src/types';
import { DefaulRow } from '@components/PersonInfoRow';

type LinkTeacherRowProps = {
  data: Teacher;
};
export const LinkTeacherRow = ({ data }: LinkTeacherRowProps) => {
  const { values, setValues } = useFormikContext<LinkTeachersData>();
  const { tenant, email, fullName } = data;
  const isChecked = useMemo(() => {
    const ind = values.teachers.findIndex((e) => e.id === data.id);
    return ind !== -1;
  }, [data.id, values.teachers]);

  const onClick = () => {
    const items = isChecked ? values.teachers.filter((e) => e.id !== data.id) : [...values.teachers, data];
    setValues({ ...values, teachers: items });
  };
  return (
    <DefaulRow
      checkboxProps={{ checked: isChecked, onClick }}
      commonInfoProps={{
        className: 'grow',
        fullName,
        email,
        badgeProps: tenant?.caption ? { iconName: 'master-home', text: tenant?.caption } : undefined,
      }}
    />
  );
};
