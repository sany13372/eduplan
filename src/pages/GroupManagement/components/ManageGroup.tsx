import React, { FC } from 'react';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';
import { DeleteEduGroupConfirmDialog } from '@src/pages/GroupManagement/components';
import { deleteGroup, groupManagementModalApi } from '@src/pages/GroupManagement/model';
import { ViewGroupInfo } from '@src/pages/GroupManagement/model/types';
import { PORTAL_ID } from '@constants/portal';
import { Portal } from '@sber-universe/om-component-library';

interface Props {
  groupData: ViewGroupInfo;
}

export const ManageGroup: FC<Props> = ({ groupData }) => {
  return (
    <Portal portalId={PORTAL_ID}>
      <div className="bg-black">
        <div className="container pt-4 pb-10">
          <div className="flex flex-col gap-3">
            <Typography as="h2" size="18px" fontWeight="regular" color="medium">
              Учебная группа
            </Typography>
            <div className="flex justify-between">
              <Typography as="h1" size="32px" fontWeight="semibold" color="white">
                {groupData.title}
              </Typography>
              <div className="flex gap-4">
                <Button
                  colorMode="onDark"
                  size="medium"
                  appearance="light-outline"
                  onClick={() => {
                    deleteGroup.setItem({ id: groupData.id, caption: groupData.title });
                  }}
                >
                  Удалить группу
                </Button>
                <Button
                  colorMode="onDark"
                  size="medium"
                  appearance="white"
                  onClick={() => {
                    groupManagementModalApi.openEditGroup(groupData.id);
                  }}
                >
                  Редактировать группу
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteEduGroupConfirmDialog />
    </Portal>
  );
};
