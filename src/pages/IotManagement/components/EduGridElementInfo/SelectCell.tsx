import { Checkbox } from '@kit-edu/checkbox';
import { setCheckedState } from '@src/pages/IotManagement/model';
import React from 'react';

type SelectCellProps = {
  gridElementId: string;
  itemId: string;
  isChecked: boolean;
};
export const SelectCell = ({ isChecked, itemId, gridElementId }: SelectCellProps): JSX.Element => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckedState({
      checked,
      id: itemId,
      gridElementId,
    });
  };

  return (
    <Checkbox
      id={`${gridElementId}_${itemId}`}
      checked={isChecked ?? false}
      onChange={changeHandler}
      className="mx-auto"
    />
  );
};
