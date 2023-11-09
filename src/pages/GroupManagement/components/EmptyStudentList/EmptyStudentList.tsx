import { Icon } from '@kit-edu/icon';
import { Typography } from '@kit-edu/typography';
import React from 'react';

export const EmptyStudentList = () => {
  return (
    <div className="flex gap-6 rounded p-6 bg-white mb-2">
      <Icon iconName="master-warning" size="20" className="text-green-500" />
      <div>
        <Typography as="h4" size="16px" color="dark" className="mb-2">
          В учебную группу не включён ни один обучающийся
        </Typography>
        <Typography size="14px" color="medium">
          Вы можете добавить в систему нового обучающегося или выбрать из списка
        </Typography>
      </div>
    </div>
  );
};
