import { Button } from '@kit-edu/button';
import { Typography } from '@kit-edu/typography';
import React, { FC } from 'react';
import { Icon } from '@kit-edu/icon';
import { GroupCardMenu } from '@src/pages/StudentGroupList/components/GroupCard';
import { emptyGroupId } from '@src/pages/StudentGroupList/model/constants';
import { Reference } from '@src/types';

interface GroupCardProps {
  group: Reference;
  studentsLength: number;
  isOpen: boolean;
}
export const GroupCard: FC<GroupCardProps> = ({ group, studentsLength, isOpen }) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <Button
          appearance="light-outline"
          shape="circular"
          iconLeftName={studentsLength === 0 ? 'master-chevron-right' : 'master-chevron-down'}
          disabled={studentsLength === 0}
          className={`${isOpen && studentsLength !== 0 && 'rotate-180 transform'}`}
        />
        <div className="flex flex-col items-start ml-4">
          <Typography size="16px" fontWeight="semibold">
            {group.caption}
          </Typography>
          <Typography color="medium" size="12px">
            Обучающиеся: {studentsLength}
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {studentsLength === 0 && (
          <span className="mr-7 flex items-center">
            <Icon style={{ color: '#21BA72' }} className="mr-3" iconName="master-warning" />
            <Typography size="14px" color="medium">
              Обучающиеся ещё не добавлены
            </Typography>
          </span>
        )}
        {group.id !== emptyGroupId && <GroupCardMenu group={group} />}
      </div>
    </>
  );
};
