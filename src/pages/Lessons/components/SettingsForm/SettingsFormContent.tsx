import { Form, useFormikContext } from 'formik';
import { dateTimeMask, FormButtonGroup, Label, MaskInput, Switch } from '@sber-universe/om-component-library';
import React from 'react';
import { LessonSettingExt } from '@src/pages/Lessons/model/types';

export type SettingsFormContentProps = {
  onReset: () => void;
  isSubmitted: boolean;
};

export const SettingsFormContent = <T extends LessonSettingExt>({ onReset }: SettingsFormContentProps): JSX.Element => {
  const { dirty, values } = useFormikContext<T>();
  return (
    <Form className="space-y-6">
      <Label caption="Занятие">{values.title}</Label>
      <Label caption="Период прохождения занятия не ограничен">
        <Switch<T> name="isAllowAlways" />
      </Label>
      {!values.isAllowAlways && (
        <div className="pl-8 space-y-6">
          <Label caption="Дата и время начала" required>
            <MaskInput<T>
              name="startDate"
              placeholder="Введите дату и время начала"
              maskProps={{ ...dateTimeMask, overwrite: false }}
              className="flex-shrink w-[160px]"
            />
          </Label>
          <Label caption="Дата и время окончания" required>
            <MaskInput<T>
              name="endDate"
              placeholder="Введите дату и время окончания"
              maskProps={{ ...dateTimeMask, overwrite: false }}
              className="flex-shrink w-[160px]"
            />
          </Label>
        </div>
      )}
      <Label caption="Срок сдачи">
        <MaskInput<T>
          name="passDate"
          placeholder="Введите срок сдачи"
          maskProps={{ ...dateTimeMask, overwrite: false }}
          className="flex-shrink w-[160px]"
        />
      </Label>
      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} />
    </Form>
  );
};
