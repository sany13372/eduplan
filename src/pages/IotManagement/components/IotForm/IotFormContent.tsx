import { Form, useFormikContext } from 'formik';
import { ComboBox, FormButtonGroup, Label } from '@sber-universe/om-component-library';
import React from 'react';
import { AddIotData, IotTemplateData } from '@src/pages/IotManagement/model/types';
import { IotTemplateItem } from '@src/pages/IotManagement/components/IotForm/IotTemplateItem';

export type IotFormContentProps = {
  templates: IotTemplateData[];
  onReset: () => void;
  isSubmitting: boolean;
  selectTemplateAvailable: boolean;
};
export const IotFormContent = ({
  templates,
  onReset,
  isSubmitting,
  selectTemplateAvailable,
}: IotFormContentProps): JSX.Element => {
  const { dirty, values } = useFormikContext<AddIotData>();
  return (
    <Form className="space-y-6">
      <Label caption="Шаблон ИОТ" required>
        <ComboBox<AddIotData>
          name="iotTemplateData"
          placeholder="Выберите шаблон ИОТ"
          items={templates}
          fullWidth
          // @ts-ignore
          matchWidth
          disabled={!selectTemplateAvailable}
        />
      </Label>
      {values.iotTemplateData && <IotTemplateItem data={values.iotTemplateData} />}
      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} isSubmitting={isSubmitting} />
    </Form>
  );
};
