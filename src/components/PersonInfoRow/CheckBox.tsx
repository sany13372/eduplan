import { Checkbox, CheckboxProps } from '@kit-edu/checkbox';

export type CheckBoxProps = Pick<CheckboxProps, 'onClick' | 'checked'>;
export const CheckBox = ({ checked, onClick }: CheckBoxProps) => {
  return <Checkbox size="medium" onClick={onClick} checked={checked} className="shrink-0" />;
};
