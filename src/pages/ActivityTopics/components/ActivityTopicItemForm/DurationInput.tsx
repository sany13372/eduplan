/* eslint-disable react/jsx-props-no-spreading */
import { Input } from '@kit-edu/input';
import React, { ChangeEvent, FC, useState } from 'react';

export type FormatFn = (totalMinutes: number) => string;

export type ParseFn = (text: string) => number;

export type DurationInputProps = React.HTMLProps<HTMLInputElement> & {
  totalMinutes: number;
  onTotalMinutesChange: (totalMinutes: number) => void;
  format: FormatFn;
  parse: ParseFn;
  id: string;
  name: string;
  showError?: boolean;
  error?: string;
};

export const DurationInput: FC<DurationInputProps> = ({
  totalMinutes,
  onTotalMinutesChange,
  format,
  parse,
  id,
  name,
  showError,
  error,
}) => {
  const [text, setText] = useState<string>(format(totalMinutes));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const nextText = event.target.value;

    const nextTotalMinutes = parse(nextText);
    if (nextTotalMinutes !== totalMinutes) {
      onTotalMinutesChange(nextTotalMinutes);
    }

    setText(format(nextTotalMinutes));
  };

  return (
    <Input
      id={id}
      name={name}
      state={showError ? 'error' : undefined}
      size="medium"
      shape="rounded"
      type="text"
      value={text}
      onChange={onChange}
      onBlur={onBlur}
      message={showError && error ? error : undefined}
    />
  );
};
