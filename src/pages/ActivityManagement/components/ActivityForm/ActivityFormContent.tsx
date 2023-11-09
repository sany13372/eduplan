import { Form, useFormikContext } from 'formik';
import { ComboBox, FormButtonGroup, Input, Label } from '@sber-universe/om-component-library';
import { Category, ShortActivityInfo } from '@src/pages/ActivityManagement/model/types';
import React from 'react';
import { Store } from 'effector';
import { EffectState } from 'patronum/status';
import { useStore } from 'effector-react';

export type ActivityFormContentProps = {
  categoryList: Category[];
  categoryChangeAvailable: boolean;
  onReset: () => void;
  statusStore: Store<EffectState>;
};
export const ActivityFormContent = ({
  categoryChangeAvailable,
  categoryList,
  onReset,
  statusStore,
}: ActivityFormContentProps): JSX.Element => {
  const { dirty } = useFormikContext();
  const status = useStore(statusStore);
  return (
    <Form className="space-y-6">
      <Label caption="Категория" required>
        <ComboBox<ShortActivityInfo>
          name="category"
          placeholder="Выберите категорию"
          items={categoryList}
          fullWidth
          // @ts-ignore
          matchWidth
          disabled={!categoryChangeAvailable}
        />
      </Label>

      <Label caption="Полное название" required>
        <Input<ShortActivityInfo> name="title" placeholder="Введите полное название" />
      </Label>
      <Label caption="Сокращённое название" required>
        <Input<ShortActivityInfo> name="shortTitle" placeholder="Введите сокращённое название" />
      </Label>

      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} isSubmitting={status === 'pending'} />
    </Form>
  );
};
