import { Teacher } from '@src/types';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { DefaulRow } from '@components/PersonInfoRow';

type LinkTeacherRowProps = {
  data: Teacher;
};
export const LinkTeacherRow = ({ data }: LinkTeacherRowProps) => {
  const { tenant, email, fullName } = data;
  const { values, setValues } = useFormikContext<{ checkedUsers: string[]; planId: string }>();
  const isChecked = useMemo(() => {
    const ind = values.checkedUsers.findIndex((e) => e === data.id);
    return ind !== -1;
  }, [data.id, values.checkedUsers]);

  const onClick = () => {
    const items = isChecked ? values.checkedUsers.filter((e) => e !== data.id) : [...values.checkedUsers, data.id];
    setValues({ ...values, checkedUsers: items });
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
