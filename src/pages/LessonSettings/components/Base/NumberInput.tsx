/* eslint-disable react/jsx-props-no-spreading,react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input as InputDefault, InputProps as InputDefaultProps } from '@kit-edu/input';
import { getIn, useField, useFormikContext } from 'formik';
import 'imask/esm/masked/range';
import isNil from 'lodash/isNil';

const numberRegExp = new RegExp(/^\d+\.?\d{0,2}$/);
const leadingZerosRegExp = new RegExp(/^[0]{2,}/);
const leadingZeroRegExp = new RegExp(/^0\d/);
export type NumberInputProps = {
  name: string;
} & Omit<InputDefaultProps, 'id' | 'name' | 'onChange' | 'onBlur' | 'value' | 'error' | 'errorMessage' | 'type'>;

export const NumberInput = ({
  name,
  size = 'medium',
  className = '',
  appearance = 'light',
  ...props
}: NumberInputProps): JSX.Element => {
  const [field, , helpers] = useField(name as string);
  const [fieldVal, setFieldVal] = useState<string | undefined>(() => {
    return !isNil(field.value) ? field.value.toString() : undefined;
  });
  const { errors } = useFormikContext();
  const errorMessage = getIn(errors, name);
  const showFieldError = Boolean(errorMessage);

  useEffect(() => {
    helpers.setValue(Number.parseFloat(fieldVal ?? ''));
  }, [fieldVal]);

  return (
    <InputDefault
      {...props}
      id={field.name}
      dataTestId={field.name}
      size={size}
      name={field.name}
      type="text"
      onBlur={field.onBlur}
      value={fieldVal ?? undefined}
      onChange={(e) => {
        let normVal = e.target.value.replace(leadingZerosRegExp, '0');
        if (leadingZeroRegExp.test(normVal)) normVal = normVal.slice(1);
        if (numberRegExp.test(normVal) || normVal === '') setFieldVal(normVal);
        else e.preventDefault();
      }}
      appearance={appearance}
      className={`${className}  ${showFieldError ? ' custom-input' : ''}`}
      state={showFieldError ? 'error' : undefined}
    />
  );
};
