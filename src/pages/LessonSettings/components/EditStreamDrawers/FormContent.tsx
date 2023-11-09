import { useFormikContext } from 'formik';
import { Stream } from '@src/pages/LessonSettings/model/types';
import { ContentPanel } from '@src/pages/LessonSettings/components';
import { DateTimeInput, Drawer, Input, NewLabel, Switch } from '@sber-universe/om-component-library';
import React from 'react';
import { EffectState } from 'patronum/status';
import { DrawerFormButtons } from '@src/components';

export const IsAllowBlock = () => {
  const { values } = useFormikContext<Stream>();
  return (
    <ContentPanel variant="white" className="flex flex-col gap-y-[34px]">
      <Switch<Stream> name="isAllowAlways" label="Обучающиеся могут пройти занятие в любое время" />
      {!values.isAllowAlways && (
        <>
          <NewLabel label="Начало занятия" type="default" variant="group">
            <DateTimeInput<Stream> name="startDate" />
          </NewLabel>
          <NewLabel label="Окончание занятия" type="default" variant="group">
            <DateTimeInput<Stream> name="endDate" />
          </NewLabel>
        </>
      )}
    </ContentPanel>
  );
};

export const PassDateBlock = () => {
  return (
    <ContentPanel variant="white">
      <NewLabel label="Срок сдачи" type="optional" variant="group">
        <DateTimeInput<Stream> name="passDate" />
      </NewLabel>
    </ContentPanel>
  );
};

export const TitleFormBlock = () => {
  return (
    <ContentPanel variant="white" className="flex flex-col gap-y-[34px]">
      <NewLabel label="Название потока" type="default" variant="group">
        <Input<Stream> name="title" placeholder="Напишите название потока" />
      </NewLabel>
    </ContentPanel>
  );
};

type ButtonBlockProps = {
  portalId: string;
  status: EffectState;
  onClose: () => void;
  submitIsDisabled?: boolean;
};
export const ButtonsBlock = ({ portalId, status, onClose, submitIsDisabled }: ButtonBlockProps) => {
  const { submitForm } = useFormikContext();
  return (
    <Drawer.Footer portalId={portalId}>
      <DrawerFormButtons
        onResetClick={onClose}
        onSubmit={submitForm}
        status={status}
        submitDisabled={submitIsDisabled}
      />
    </Drawer.Footer>
  );
};
