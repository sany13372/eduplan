import { Form, useFormikContext } from 'formik';
import { FormButtonGroup, Input, Label } from '@sber-universe/om-component-library';
import React from 'react';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';

import { ActivitySelectField } from './ActivitySelectField';

export type IotTemplateFormContentProps = {
  onReset: () => void;
  isSubmitting: boolean;
};
export const IotTemplateFormContent = <T extends IotTemplate>({
  onReset,
  isSubmitting,
}: IotTemplateFormContentProps): JSX.Element => {
  const { dirty } = useFormikContext();
  return (
    <Form className="space-y-6">
      <Label caption="Название" required>
        <Input<T> name="title" placeholder="Введите название ИОТ" />
      </Label>
      <ActivitySelectField />
      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} isSubmitting={isSubmitting} />
    </Form>
  );
};
