import { useParams } from 'react-router-dom';
import { getPath, ImplParams, MfeRoutes } from '@constants/routes';
import { useStore } from 'effector-react';
import { eduPlanRowData, resetDomain } from '@src/pages/Lessons/model';
import React, { useEffect, useMemo } from 'react';
import { setNavigationInfo } from '@src/app/model';
import { Typography } from '@kit-edu/typography';
import { StudentTable } from '@src/pages/Lessons/components';
import { LinkButton } from '@kit-edu/button';
import { useMfeBackGround } from '@utils/hooks';
import { LoadingWrapper } from '@sber-universe/om-component-library';

export const ViewLinkedStudents = (): JSX.Element => {
  const { themeId, implId } = useParams<ImplParams>();

  const getEduPlanRowInfoStatus = useStore(eduPlanRowData.$status);
  const getEduPlanRowInfoValue = useStore(eduPlanRowData.$value);
  useEffect(() => resetDomain, []);
  useEffect(() => {
    eduPlanRowData.get(themeId);
  }, [themeId]);

  const prevPath = useMemo(() => {
    if (getEduPlanRowInfoValue) {
      return getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_SETTINGS_INFO, {
        ':planId': getEduPlanRowInfoValue.eduPlanId,
        ':activityId': getEduPlanRowInfoValue.id,
      });
    }
    return '';
  }, [getEduPlanRowInfoValue]);

  useEffect(() => {
    if (prevPath) setNavigationInfo({ label: 'К карточке мероприятия', to: prevPath });
  }, [prevPath]);

  useMfeBackGround('gray');
  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        Обучающиеся, записанные на занятие
      </Typography>
      <LoadingWrapper errorStatusList={[getEduPlanRowInfoStatus]} loadingStatusList={[getEduPlanRowInfoStatus]}>
        <div className="space-y-2">
          <div className="flex justify-end">
            <LinkButton
              size="medium"
              to={getPath(MfeRoutes.EDU_PLAN_INFO_LESSON_STUDENTS_EDIT, {
                ':themeId': themeId,
                ':implId': implId,
              })}
            >
              Изменить
            </LinkButton>
          </div>
          <StudentTable activityRowId={getEduPlanRowInfoValue?.id ?? ''} implId={implId} />
        </div>
      </LoadingWrapper>
    </div>
  );
};
