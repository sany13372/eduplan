/* eslint-disable react/jsx-props-no-spreading */
import { PersonInfoRow } from './PersonInfoRow';
import { CommonInfoBlockProps } from './CommonInfoBlock';
import { RemoveButtonProps } from './RemoveButton';
import { CheckBoxProps } from './CheckBox';

export type DefaultRowProps = {
  checkboxProps?: CheckBoxProps;
  removeButtonProps?: RemoveButtonProps;
  commonInfoProps?: CommonInfoBlockProps;
};
export const DefaulRow = ({ commonInfoProps, checkboxProps, removeButtonProps }: DefaultRowProps) => {
  return (
    <PersonInfoRow>
      {checkboxProps && <PersonInfoRow.CheckBox {...checkboxProps} />}
      {commonInfoProps && <PersonInfoRow.CommonInfoBlock {...commonInfoProps} />}
      {removeButtonProps && <PersonInfoRow.RemoveButton {...removeButtonProps} />}
    </PersonInfoRow>
  );
};
