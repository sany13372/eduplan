import { useStore } from 'effector-react';
import { eventFormatStore, eventKindStore } from '@src/pages/Events/model';
import { ComboBox, Label } from '@sber-universe/om-component-library';
import { SetEventInfo } from '@src/pages/Events/model/types';
import React from 'react';

export const ReferencesForm = () => {
  const eventKindList = useStore(eventKindStore.$value);
  const eventFormatList = useStore(eventFormatStore.$value);
  return (
    <>
      <Label caption="Вид">
        <ComboBox<SetEventInfo>
          name="kind"
          placeholder="Выберите вид занятия"
          fullWidth
          // @ts-ignore
          matchWidth
          items={eventKindList}
        />
      </Label>
      <Label caption="Формат проведения">
        <ComboBox<SetEventInfo>
          name="format"
          placeholder="Выберите формат занятия"
          fullWidth
          // @ts-ignore
          matchWidth
          items={eventFormatList}
        />
      </Label>
    </>
  );
};
