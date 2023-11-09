import React from 'react';
import { DateInfo, Label, TextContent } from '@src/pages/LessonSettings/components';

type TextBlockProps = { label: React.ReactText; value: React.ReactText; dataTestId?: string };
export const TextBlock = ({ value, label, dataTestId }: TextBlockProps) => {
  return (
    <Label label={label} dataTestId={dataTestId}>
      <TextContent color="dark">{value}</TextContent>
    </Label>
  );
};

type DateBlockProps = {
  label: React.ReactText;
  value: Date | null;
  defaultValue: React.ReactText;
  dataTestId?: string;
};
export const DateBlock = ({ value, label, defaultValue, dataTestId }: DateBlockProps) => {
  return (
    <Label label={label} dataTestId={dataTestId}>
      {value ? <DateInfo value={value} /> : <TextContent color="dark">{defaultValue}</TextContent>}
    </Label>
  );
};
