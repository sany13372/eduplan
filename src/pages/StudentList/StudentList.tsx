import { LinkButton } from '@kit-edu/button';
import { getPath, MfeRoutes } from '@constants/routes';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EduPlanParams } from '@src/types';
import { StudentListTable } from '@src/pages/StudentList/components';
import { Typography } from '@kit-edu/typography';
import { useMfeBackGround } from '@utils/hooks';

export const StudentList = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  useMfeBackGround('gray');
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between">
        <Typography as="h2" size="32px" fontWeight="semibold">
          Обучающиеся
        </Typography>
        <LinkButton to={getPath(MfeRoutes.EDU_PLAN_INFO_STUDENT_CREATE, { ':planId': planId })} size="medium">
          Добавить
        </LinkButton>
      </div>
      <div>
        <StudentListTable eduPlanId={planId} />
      </div>
    </div>
  );
};
