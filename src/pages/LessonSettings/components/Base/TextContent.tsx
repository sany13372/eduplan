/* eslint-disable react/jsx-props-no-spreading */
import { Typography, TypographyProps } from '@kit-edu/typography';
import React from 'react';
import { DotDividersContainer } from '@sber-universe/om-component-library';

type TextContentProps = Partial<TypographyProps>;

const defaultTypographyParams: Partial<TypographyProps> = {
  size: '14px',
  color: 'medium',
  fontWeight: 'semibold',
};

export const TextContent: React.FC<TextContentProps> = ({ children, ...props }) => {
  return (
    <Typography {...defaultTypographyParams} {...props}>
      {children}
    </Typography>
  );
};

type DateInfoProps = {
  value: Date;
  dateParams?: TextContentProps;
  timeParams?: TextContentProps;
};
export const DateInfo = ({ dateParams = {}, timeParams = {}, value }: DateInfoProps) => {
  const date = value.toLocaleDateString('ru');
  const time = value.toLocaleTimeString('ru', { timeStyle: 'short' });
  return (
    <DotDividersContainer>
      <TextContent color="dark" {...dateParams}>
        {date}
      </TextContent>
      <TextContent fontWeight="regular" {...timeParams}>
        {time}
      </TextContent>
    </DotDividersContainer>
  );
};
