/* eslint-disable react/jsx-props-no-spreading */
import { Typography, TypographyProps } from '@kit-edu/typography';
import React from 'react';
import classnames from 'classnames';

type TypographyParams = Partial<Pick<TypographyProps, 'fontWeight' | 'size' | 'color' | 'className' | 'lineHeight'>>;
type LabelProps = {
  label: React.ReactText;
  dataTestId?: string;
  containerClassName?: string;
  typographyParams?: TypographyParams;
};
const defaultTypographyParams: TypographyParams = {
  size: '14px',
  color: 'medium',
};
export const Label: React.FC<LabelProps> = ({
  dataTestId = 'labelDataTestId',
  label,
  typographyParams = {},
  containerClassName = '',
  children,
}) => {
  const params = { ...defaultTypographyParams, ...typographyParams };
  return (
    <div className={classnames('flex flex-col gap-y-1', containerClassName)} data-testid={dataTestId}>
      <Typography {...params}>{label}</Typography>
      {children}
    </div>
  );
};
