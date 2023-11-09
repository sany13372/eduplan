import { ComboBox } from '@src/components';
import { userStatusList } from '@src/pages/Events/model/constants';
import React from 'react';
import { ItemProps } from '@kit-edu/selectbox';
import { useFormikContext } from 'formik';
import { EventParticipantsInfo, Participant } from '@src/pages/Events/model/types';

type SelectRoleProps = {
  item: Participant;
};
export const SelectRole = ({ item }: SelectRoleProps) => {
  const { values, setFieldValue } = useFormikContext<EventParticipantsInfo>();

  const selectedItem = values.participants.find((e) => e.id === item.id);
  const isDisabled = !selectedItem;
  const onStatusSelect = (el: ItemProps) => {
    const newVal = values.participants.map((e) => (e.id === item.id ? { ...e, role: el } : e));
    setFieldValue('participants', newVal, false);
  };

  return (
    <ComboBox
      containerClassName="w-[112px]"
      disabled={isDisabled}
      selected={selectedItem?.role ?? item.role}
      items={userStatusList}
      setSelected={onStatusSelect}
      size="small"
    />
  );
};
