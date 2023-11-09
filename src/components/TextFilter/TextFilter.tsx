/* eslint-disable react/jsx-props-no-spreading */
import { Input, InputProps } from '@kit-edu/input';
import React from 'react';

type TextFilterProps = InputProps;
export const TextFilter = ({
  size = 'medium',
  appearance = 'white',
  colorMode = 'onDark',
  iconName = 'master-search',
  ...props
}: TextFilterProps) => {
  return <Input size={size} appearance={appearance} iconName={iconName} colorMode={colorMode} {...props} />;
};
