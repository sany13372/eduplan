import { useHistory, useParams } from 'react-router-dom';
import { getPath, ImplParams, MfeRoutes } from '@constants/routes';
import { eduPlanRowData, resetDomain, updateLinkedStudentsInitialData } from '@src/pages/Lessons/model';
import React, { useEffect, useMemo } from 'react';
import { setNavigationInfo } from '@src/app/model';
import { Typography } from '@kit-edu/typography';
import { StudentsForm } from '@src/pages/Lessons/components';
import { useStore } from 'effector-react';
import { SelectedStudents } from '@src/pages/Lessons/model/types';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { useMfeBackGround } from '@utils/hooks';

export const UpdateLinkedStudents = (): JSX.Element => {
  const { themeId, implId } = useParams<ImplParams>();
  const history = useHistory();

  useEffect(() => resetDomain, []);
  useEffect(() => {
    eduPlanRowData.get(themeId);
  }, [themeId]);

  const getLinkedStudentsStatus = useStore(updateLinkedStudentsInitialData.$status);
  const linkedStudents = useStore(updateLinkedStudentsInitialData.$value);
  const initData: SelectedStudents = useMemo(
    () => ({
      idList: linkedStudents,
      implIdList: [implId],
      activityRowId: themeId,
    }),
    [implId, linkedStudents, themeId],
  );

  useEffect(() => {
    updateLinkedStudentsInitialData.get(implId);
  }, [implId]);

  const prevPath = useMemo(() => {
    return getPath(MfeRoutes.EDU_PLAN_INFO_LESSON_STUDENTS_VIEW, {
      ':themeId': themeId,
      ':implId': implId,
    });
  }, [implId, themeId]);

  useEffect(() => {
    if (prevPath) setNavigationInfo({ label: 'К списку обучающихся, записанных на занятие', to: prevPath });
  }, [prevPath]);

  useMfeBackGround('gray');
  const onSuccess = () => history.push(prevPath);
  const onReset = () => history.push(prevPath);

  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        Запись обучающихся на занятие
      </Typography>
      <LoadingWrapper errorStatusList={[getLinkedStudentsStatus]} loadingStatusList={[getLinkedStudentsStatus]}>
        <StudentsForm onSuccess={onSuccess} initData={initData} onReset={onReset} />
      </LoadingWrapper>
    </div>
  );
};
