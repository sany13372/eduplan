import { LinkButton } from '@kit-edu/button';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DeleteEduGroupConfirmDialog, EduGroupListTable } from '@src/pages/GroupList/components';
import { Typography } from '@kit-edu/typography';
import { useMfeBackGround } from '@utils/hooks';

export const GroupList = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  useMfeBackGround('gray');
  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Typography as="h2" size="32px" fontWeight="semibold">
            Учебные группы
          </Typography>
          <LinkButton to={getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_CREATE, { ':planId': planId })} size="medium">
            Добавить
          </LinkButton>
        </div>
        <div>
          <EduGroupListTable />
        </div>
      </div>
      <DeleteEduGroupConfirmDialog />
    </>
  );
};
