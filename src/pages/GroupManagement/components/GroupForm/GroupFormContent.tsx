import { Form, useFormikContext } from 'formik';
import { ComboBox, FormButtonGroup, Input, Label } from '@sber-universe/om-component-library';
import React from 'react';
import { CreateGroupInfo, EduGroupType } from '@src/pages/GroupManagement/model/types';

export type GroupFormContentProps = {
  groupTypes: EduGroupType[];
  groupTypesChangeAvailable: boolean;
  onReset: () => void;
};
export const GroupFormContent = ({
  groupTypesChangeAvailable,
  groupTypes,
  onReset,
}: GroupFormContentProps): JSX.Element => {
  const { dirty } = useFormikContext();
  return (
    <Form className="space-y-6">
      <Label caption="Тип группы" required>
        <ComboBox<CreateGroupInfo>
          name="groupType"
          placeholder="Выберите тип группы"
          items={groupTypes}
          disabled={!groupTypesChangeAvailable}
          fullWidth
          // @ts-ignore
          matchWidth
        />
      </Label>

      <Label caption="Название" required>
        <Input<CreateGroupInfo> name="title" placeholder="Введите название учебной группы" />
      </Label>

      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} />
    </Form>
  );
};
