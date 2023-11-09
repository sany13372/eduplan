import React from 'react';
import { useField } from 'formik';

import { useFieldError } from './hooks';
import { DurationInput, FormatFn, ParseFn } from './DurationInput';

export type FormikDurationInputProps<T extends Record<string, unknown>> = {
  name: keyof T;
  format: FormatFn;
  parse: ParseFn;
};

export const FormikDurationInput = <T extends Record<string, unknown>>({
  name,
  format,
  parse,
}: FormikDurationInputProps<T>): JSX.Element => {
  const [field, meta, { setValue }] = useField(name as string);
  const [showError, error] = useFieldError(field, meta);

  const onChange = (totalMinutes: number) => {
    setValue(totalMinutes);
  };

  return (
    <div className="w-full">
      <DurationInput
        id={field.name}
        name={field.name}
        showError={showError}
        error={error}
        format={format}
        parse={parse}
        totalMinutes={field.value as number}
        onTotalMinutesChange={onChange}
      />
    </div>
  );
};
