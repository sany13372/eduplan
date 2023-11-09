/* eslint-disable react-hooks/exhaustive-deps */
import { ItemProps } from '@kit-edu/selectbox';
import { FilterLabel, ComboBox as Selectbox } from '@src/components';
import { useMemo } from 'react';

type ComboBoxFilterProps<T extends ItemProps> = {
  isSubFilter?: boolean;
  label: string;
  disabled?: boolean;
  value: T;
  options: T[];
  onSelect: (val: T) => void;
  selectBoxMaxHeight?:string | number;
};
export const ComboBoxFilter = <T extends ItemProps>({
  options,
  isSubFilter = false,
  disabled = false,
  label,
  value,
  onSelect,
  selectBoxMaxHeight = 400,
}: ComboBoxFilterProps<T>): JSX.Element => {
  const comboBoxClassNames = isSubFilter ? 'flex-grow' : '';
  const selectedValue = useMemo(() => {
    if (!value) return null;
    return value;
  }, [value]);

  const setSelected = (val: ItemProps) => {
    onSelect(val as unknown as T);
  };
  return (
    <FilterLabel label={label} isSubFilter={isSubFilter}>
      <Selectbox
        className={comboBoxClassNames}
        selected={selectedValue}
        disabled={disabled}
        items={options}
        fullWidth
        matchWidth
        setSelected={setSelected}
        maxHeight={selectBoxMaxHeight}
      />
    </FilterLabel>
  );
};
