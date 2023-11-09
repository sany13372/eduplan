import React from 'react';
import { TrajectoryData } from '@src/pages/IotManagement/model/types';
import { deleteTrajectory } from '@src/pages/IotManagement/model';
import { Button } from '@kit-edu/button';

type DeleteCellProps = {
  trajectory: TrajectoryData;
};
export const DeleteCell = ({ trajectory }: DeleteCellProps): JSX.Element => {
  const onClickHandler = () => {
    deleteTrajectory.setItem(trajectory);
  };

  return (
    <Button
      iconLeftName="master-master-delete"
      size="extra-small"
      shape="circular"
      appearance="dark-outline"
      onClick={onClickHandler}
    />
  );
};
