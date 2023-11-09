import { Form, useFormikContext } from 'formik';
import { ComboBox, FormButtonGroup, Input, Label } from '@sber-universe/om-component-library';
import { ComponentKind, ShortActivityGroupInfo } from '@src/pages/ActivityManagement/model/types';
import React from 'react';
import { Store } from 'effector';
import { EffectState } from 'patronum/status';
import { useStore } from 'effector-react';

export type ActivityGroupFormContentProps = {
  componentKindList: ComponentKind[];
  componentKindListChangeAvailable: boolean;
  onReset: () => void;
  statusStore: Store<EffectState>;
};
export const ActivityGroupFormContent = ({
  componentKindListChangeAvailable,
  componentKindList,
  onReset,
  statusStore,
}: ActivityGroupFormContentProps): JSX.Element => {
  const { dirty } = useFormikContext();
  const status = useStore(statusStore);

  return (
    <Form className="space-y-6">
      <Label caption="Вид группы" required>
        <ComboBox<ShortActivityGroupInfo>
          name="component"
          placeholder="Выберите вид группы мероприятий"
          items={componentKindList}
          disabled={!componentKindListChangeAvailable}
          fullWidth
          // @ts-ignore
          matchWidth
        />
      </Label>

      <Label caption="Полное название" required>
        <Input<ShortActivityGroupInfo> name="title" placeholder="Введите полное название" />
      </Label>
      <Label caption="Сокращённое название" required>
        <Input<ShortActivityGroupInfo> name="shortTitle" placeholder="Введите сокращённое название" />
      </Label>

      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} isSubmitting={status === 'pending'} />
    </Form>
  );
};
