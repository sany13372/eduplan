/* eslint-disable react/jsx-props-no-spreading */
import { Selectbox, SelectboxProps } from '@kit-edu/selectbox';
import './comboboxnew.css';
import React from 'react';

type ComboBoxProps = { containerClassName?: string } & SelectboxProps;
export const ComboBox = ({ containerClassName = '', ...props }: ComboBoxProps) => {
  const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={`${containerClassName} combobox-new`} onClick={preventBubbling}>
      <Selectbox {...props} />
    </div>
  );
};
