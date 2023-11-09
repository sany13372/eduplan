import { Button } from '@kit-edu/button';
import React from 'react';

type ButtonGroupProps = {
  editClickHandler?: () => void;
  deleteClickHandler?: () => void;
};

export const LightButtonGroup = ({ editClickHandler, deleteClickHandler }: ButtonGroupProps) => (
  <>
    {editClickHandler && (
      <Button
        iconLeftName="master-edit"
        size="small"
        shape="circular"
        appearance="dark-outline"
        onClick={editClickHandler}
      />
    )}
    {deleteClickHandler && (
      <Button
        iconLeftName="master-master-delete"
        size="small"
        shape="circular"
        appearance="dark-outline"
        onClick={deleteClickHandler}
      />
    )}
  </>
);
export const DarkButtonGroup = ({ editClickHandler, deleteClickHandler }: ButtonGroupProps) => (
  <>
    {deleteClickHandler && (
      <Button
        iconLeftName="master-master-delete"
        size="medium"
        shape="rectangular"
        appearance="dark-outline"
        colorMode="onDark"
        onClick={deleteClickHandler}
      />
    )}
    {editClickHandler && (
      <Button
        iconLeftName="master-edit"
        size="medium"
        shape="rectangular"
        appearance="white"
        colorMode="onDark"
        onClick={editClickHandler}
      />
    )}
  </>
);
