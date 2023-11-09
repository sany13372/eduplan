import { Checkbox } from '@kit-edu/checkbox';
import React from 'react';
import { EventParticipantsInfo, Participant } from '@src/pages/Events/model/types';
import { useFormikContext } from 'formik';

type AddParticipantCheckBoxProps = {
  item: Participant;
};
export const AddParticipantCheckBox = ({ item }: AddParticipantCheckBoxProps) => {
  const { values, setFieldValue } = useFormikContext<EventParticipantsInfo>();

  const isNewItem = !values.participants.find((e) => e.id === item.id);
  const onChange = () => {
    setFieldValue(
      'participants',
      isNewItem ? [...values.participants, item] : values.participants.filter((e) => e.id !== item.id),
      false,
    );
  };

  return <Checkbox checked={!isNewItem} onChange={onChange} size="small" />;
};
