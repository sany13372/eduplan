import { LinkStudentsData } from '@src/pages/LessonSettings/model/types';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { Student } from '@src/types';
import { DefaulRow } from '@components/PersonInfoRow';

type LinkStudentRowProps = {
  data: Student;
};
export const LinkStudentRow = ({ data }: LinkStudentRowProps) => {
  const { values, setValues } = useFormikContext<LinkStudentsData>();
  const { fullName, email, group } = data;
  const isChecked = useMemo(() => {
    const ind = values.students.findIndex((e) => e.id === data.id);
    return ind !== -1 || values.linkAll;
  }, [data.id, values.linkAll, values.students]);

  const onClick = () => {
    const items = isChecked ? values.students.filter((e) => e.id !== data.id) : [...values.students, data];
    setValues({ ...values, students: items });
  };
  return (
    <DefaulRow
      checkboxProps={!values.linkAll ? { checked: isChecked, onClick } : undefined}
      commonInfoProps={{
        className: 'grow',
        fullName,
        email,
        badgeProps: group?.caption ? { iconName: 'master-team', text: group?.caption } : undefined,
      }}
    />
  );
};
