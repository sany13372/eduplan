import { Button } from '@kit-edu/button';
import React from 'react';
import { useFormikContext } from 'formik';
import { EventParticipantsInfo, Participant } from '@src/pages/Events/model/types';
import { addParticipant } from '@src/pages/Events/model';

type RemoveParticipantProps = {
  item: Participant;
};

export const RemoveParticipant = ({ item }: RemoveParticipantProps) => {
  const { values, setFieldValue } = useFormikContext<EventParticipantsInfo>();
  const clickHandler = () => {
    const newVal = values.participants.filter((e) => e.id !== item.id);
    addParticipant(item);
    setFieldValue('participants', newVal, false);
  };

  return (
    <Button
      aria-label="remove"
      appearance="dark-outline"
      onClick={clickHandler}
      shape="circular"
      size="medium"
      className="w-10"
      iconLeftName="master-master-delete"
    />
  );
};
